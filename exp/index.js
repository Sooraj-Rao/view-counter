import rateLimit from "express-rate-limit";
import express from "express";
import { View } from "./src/model.js";
import { connectDB } from "./src/connect.js";
import NodeCache from "node-cache";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import { check, validationResult } from "express-validator";
import http from "http";
import cors from "cors";
import { colorStyles } from "./src/utils/color-styles.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());
connectDB();

const cache = new NodeCache({ stdTTL: 120, checkperiod: 120 });

const viewRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests, please try again later.",
});

app.get("/:url", viewRateLimiter, async (req, res) => {
  const { url } = req.params;

  if (!url) {
    return res.status(400).send("URL is required");
  }

  const {
    text = "Profile Views",
    colorStyle = "1",
    width = 220,
    height = 40,
    icon = "eye",
    scale = 1,
    borderRadius = 20,
    fontFamily = "Arial, sans-serif",
    fontSize = 14,
    fontWeight = "bold",
    iconSize = 24,
  } = req.query;

  const style = colorStyles[colorStyle] || colorStyles[1];
  const isGradientTheme = parseInt(colorStyle) > 10;

  try {
    const now = Date.now();
    let viewData;
    const cachedTimestamp = cache.get(url);
    if (cachedTimestamp && now - cachedTimestamp < 120000) {
      console.log("Cooldown active - not incrementing view count");
    } else {
      cache.set(url, now);

      viewData = await View.findOneAndUpdate(
        { url },
        { $inc: { views: 1 } },
        { new: true }
      );
      if (viewData) cache.set(`${url}_views`, viewData?.views);
    }

    const views = cache.get(`${url}_views`) || viewData?.views;
    if (!views || viewData) {
      return res.status(404).send("Not found");
    }
    res.set("Content-Type", "image/svg+xml");

    const icons = {
      eye: `<path d="M12 5C5.636 5 2 12 2 12s3.636 7 10 7 10-7 10-7-3.636-7-10-7zm0 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="${style.iconColor}"/>`,
      heart: `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${style.iconColor}"/>`,
      people: `<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z" fill="${style.iconColor}"/>`,
      star: `<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="${style.iconColor}"/>`,
      thumbsUp: `<path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="${style.iconColor}"/>`,
    };
    if (views)
      res.send(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${
          width * scale
        }" height="${height * scale}" viewBox="0 0 ${width} ${height}">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:${
                style.gradientStart
              };stop-opacity:1" />
              <stop offset="100%" style="stop-color:${
                style.gradientEnd
              };stop-opacity:1" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.3"/>
            </filter>
          </defs>
  
          <rect width="${width}" height="${height}" rx="${borderRadius}" fill="url(#grad)" filter="url(#shadow)" />
          ${
            isGradientTheme
              ? ""
              : `<rect x="2" y="2" width="${width - 4}" height="${
                  height - 4
                }" rx="${borderRadius - 2}" fill="${style.bgColor}" />`
          }
  
          <svg x="12" y="8" width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none">
            ${icons[icon] || icons.eye}
          </svg>
  
          <text x="44" y="${
            height / 2 + 5
          }" font-family="${fontFamily}" font-size="${fontSize}" fill="${
        style.textColor
      }" font-weight="${fontWeight}">${text}</text>
  
          <rect x="${width - 68}" y="6" width="60" height="${
        height - 12
      }" rx="${(height - 12) / 2}" fill="${style.viewBgColor}" ${
        isGradientTheme ? 'fill-opacity="0.2"' : ""
      } filter="url(#shadow)" />
          <text x="${width - 38}" y="${
        height / 2 + 5
      }" font-family="${fontFamily}" font-size="${fontSize}" fill="${
        style.viewColor
      }" text-anchor="middle" font-weight="${fontWeight}">${views.toLocaleString()}</text>
        </svg>
      `);
  } catch (error) {
    console.error("Error generating SVG:", error);
    res.status(500).send("An error occurred while generating the SVG.");
  }
});

app.post(
  "/create",
  [check("url").notEmpty().withMessage("URL is required")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { url } = req.body;

    try {
      const existingView = await View.findOne({ url });

      if (existingView) {
        return res.status(400).json({ error: "URL already exists" });
      }

      const newView = new View({ url });
      await newView.save();

      res.status(201).json(newView);
    } catch (error) {
      console.error("Error creating view:", error);
      res.status(500).send("Server error");
    }
  }
);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);
