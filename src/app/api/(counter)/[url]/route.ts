/* eslint-disable @typescript-eslint/no-unused-expressions */
import { NextRequest, NextResponse } from "next/server";
import { ConnectDb } from "@/app/lib/connect";
import { View } from "@/app/lib/model";
import NodeCache from "node-cache";
import { colorStyles } from "@/app/lib/colorStyles";
import { SendMail } from "@/actions/mail";
import { GetData } from "@/lib/info";

type ColorStyleKey = keyof typeof colorStyles;

interface SVGOptions {
  text: string;
  colorStyle: ColorStyleKey;
  icon: keyof typeof icons;
  scale: number;
  borderRadius: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  iconSize: number;
  padding: number;
  gap: number;
  width: number;
  bgColor?: string | null;
  textColor?: string | null;
  iconColor?: string | null;
  viewsBgColor?: string | null;
  viewsColor?: string | null;
  gradientStart?: string | null;
  gradientEnd?: string | null;
  borderColor?: string | null;
}

const cache = new NodeCache({ stdTTL: 180, checkperiod: 60 });

const icons = {
  eye: (color: string) =>
    `<path d="M12 5C5.636 5 2 12 2 12s3.636 7 10 7 10-7 10-7-3.636-7-10-7zm0 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="${color}"/>`,
  heart: (color: string) =>
    `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${color}"/>`,
  people: (color: string) =>
    `<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z" fill="${color}"/>`,
  star: (color: string) =>
    `<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="${color}"/>`,
  thumbsUp: (color: string) =>
    `<path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="${color}"/>`,
};

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { url: string } }
) {
  const { url } = params;
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  GetData(request);

  const searchParams = request.nextUrl.searchParams;
  const options: SVGOptions = {
    text: searchParams.get("text") || "Profile Views",
    colorStyle: (searchParams.get("colorStyle") || "5") as ColorStyleKey,
    icon: (searchParams.get("icon") || "eye") as keyof typeof icons,
    scale: parseFloat(searchParams.get("scale") || "1"),
    borderRadius: parseInt(searchParams.get("borderRadius") || "20"),
    fontFamily: searchParams.get("fontFamily") || "Arial, sans-serif",
    fontSize: parseInt(searchParams.get("fontSize") || "14"),
    fontWeight: searchParams.get("fontWeight") || "bold",
    iconSize: parseInt(searchParams.get("iconSize") || "24"),
    padding: parseInt(searchParams.get("padding") || "12"),
    gap: parseInt(searchParams.get("gap") || "8"),
    width: parseInt(searchParams.get("width") || "220"),
    bgColor: searchParams.get("bgColor"),
    textColor: searchParams.get("textColor"),
    iconColor: searchParams.get("iconColor"),
    viewsBgColor: searchParams.get("viewsBgColor"),
    viewsColor: searchParams.get("viewsColor"),
    gradientStart: searchParams.get("gradientStart"),
    gradientEnd: searchParams.get("gradientEnd"),
    borderColor: searchParams.get("borderColor"),
  };

  const getMe = request.url.split("me=")[1];
  const isMe = getMe === process.env.OWNER;
  const cacheKey = `views_${url}`;
  const cachedViews = cache.get(cacheKey);
  try {
    let views;
    const isTesting = url === "test";
    if (!isTesting) {
      await ConnectDb();
      const now = Date.now();
      let viewData;

      if (cachedViews !== undefined) {
        views = cachedViews;
        console.log("Using cached");
      } else {
        viewData = await View.findOne({ url });
        views = viewData ? viewData.views : 0;

        if (!isMe) {
          const lastIncrementKey = `last_increment_${url}`;
          const lastIncrement = cache.get(lastIncrementKey) as number;

          if (!lastIncrement || now - lastIncrement > 180000) {
            views++;
            await View.findOneAndUpdate(
              { url },
              { $set: { views: views } },
              { upsert: true }
            );
            cache.set(lastIncrementKey, now);
          }
        } else {
          console.log("Me using");
        }

        cache.set(cacheKey, views);
      }
    } else {
      views = 100;
    }

    const svg = generateSVG(url, views, options);
    if (!isMe && !isTesting && !cachedViews) {
      const { error } = await SendMail({ name: url, url: request.url });
      error && console.log("Error Sending mail --> ", error);
    }

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating SVG:", error);
    return NextResponse.json(
      { error: "An error occurred while generating the SVG." },
      { status: 500 }
    );
  }
}

function generateSVG(url: string, views: number, options: SVGOptions): string {
  const baseStyle = colorStyles[options.colorStyle] || colorStyles[1];
  const style = {
    ...baseStyle,
    bgColor: options.bgColor || baseStyle.bgColor,
    textColor: options.textColor || baseStyle.textColor,
    iconColor: options.iconColor || baseStyle.iconColor,
    viewBgColor: options.viewsBgColor || baseStyle.viewBgColor,
    viewColor: options.viewsColor || baseStyle.viewColor,
    gradientStart: options.gradientStart || baseStyle.gradientStart,
    gradientEnd: options.gradientEnd || baseStyle.gradientEnd,
    borderColor: options.borderColor || baseStyle.bgColor,
  };
  const isGradientTheme = parseInt(options.colorStyle) > 10;

  const height = 40;
  const { width } = options;

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${
    width * options.scale
  }" height="${height * options.scale}" viewBox="0 0 ${width} ${height}">
    <a href="https://viewcount.soorajrao.in?ref=${url}" target="_blank">
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

      <rect width="${width}" height="${height}" rx="${
    options.borderRadius
  }" fill="${style.borderColor}" />
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="${
    options.borderRadius - 1
  }" fill="url(#grad)" filter="url(#shadow)" />
      ${
        isGradientTheme
          ? ""
          : `<rect x="2" y="2" width="${width - 4}" height="${
              height - 4
            }" rx="${options.borderRadius - 2}" fill="${style.bgColor}" />`
      }

      <svg x="12" y="8" width="${options.iconSize}" height="${
    options.iconSize
  }" viewBox="0 0 24 24" fill="none">
        ${icons[options.icon](style.iconColor)}
      </svg>

      <text x="44" y="${height / 2 + 5}" font-family="${
    options.fontFamily
  }" font-size="${options.fontSize}" fill="${style.textColor}" font-weight="${
    options.fontWeight
  }">${options.text}</text>

      <rect x="${width - 68}" y="6" width="60" height="${height - 12}" rx="${
    (height - 12) / 2
  }" fill="${style.viewBgColor}" ${
    isGradientTheme ? 'fill-opacity="0.2"' : ""
  } filter="url(#shadow)" />
      <text x="${width - 38}" y="${height / 2 + 5}" font-family="${
    options.fontFamily
  }" font-size="${options.fontSize}" fill="${
    style.viewColor
  }" text-anchor="middle" font-weight="${
    options.fontWeight
  }">${formatLargeNumber(views)}</text>
    </a>
  </svg>
`;
}

function formatLargeNumber(number: number): string {
  function addCommas(num: number): string {
    return num.toLocaleString("en-US");
  }
  if (number < 1000) {
    return number.toString();
  }
  if (number >= 1e9) {
    const result = (number / 1e9).toFixed(1);
    return (result.endsWith(".0") ? parseFloat(result) : result) + "B";
  } else if (number >= 1e6) {
    const result = (number / 1e6).toFixed(1);
    return (result.endsWith(".0") ? parseFloat(result) : result) + "M";
  } else if (number >= 1e3) {
    const result = (number / 1e3).toFixed(1);
    return (result.endsWith(".0") ? parseFloat(result) : result) + "K";
  } else {
    return addCommas(number);
  }
}
