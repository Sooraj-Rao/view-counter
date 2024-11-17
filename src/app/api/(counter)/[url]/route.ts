import { NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";
import { ConnectDb } from "@/app/lib/connect";
import { View } from "@/app/lib/model";
import { SendMail } from "@/actions/mail";
import { colorStyles } from "@/lib/colorStyles";
import { SVGOptions } from "@/lib/types";
import { icons } from "@/lib/utils";

const cache = new NodeCache({ stdTTL: 60, checkperiod: 60 });

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { url: string } }
): Promise<NextResponse> {
  const { url } = params;
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;
  const options: SVGOptions = parseOptions(searchParams);

  const isMe = request.url.split("me=")[1] === process.env.OWNER;
  const isTesting = url === "test";

  try {
    const views = await getViews(url, isMe, isTesting, request);
    const svg = generateSVG(url, views, options);
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

function parseOptions(searchParams: URLSearchParams): SVGOptions {
  return {
    text: searchParams.get("text") || "Profile Views",
    colorStyle: (searchParams.get("colorStyle") || "5") as string,
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
    bgColor: searchParams.get("bgColor") || null,
    textColor: searchParams.get("textColor") || null,
    iconColor: searchParams.get("iconColor") || null,
    viewsBgColor: searchParams.get("viewsBgColor") || null,
    viewsColor: searchParams.get("viewsColor") || null,
    gradientStart: searchParams.get("gradientStart") || null,
    gradientEnd: searchParams.get("gradientEnd") || null,
    borderColor: searchParams.get("borderColor") || null,
  };
}

async function getViews(
  url: string,
  isMe: boolean,
  isTesting: boolean,
  request: NextRequest
): Promise<number> {
  if (isTesting) return 100;

  const cacheKey = `views_${url}`;
  const cachedViews = cache.get<number>(cacheKey);
  if (cachedViews !== undefined) return cachedViews;

  if (!isMe && !isTesting && !cache.get(`views_${url}`)) {
    await SendMail({ name: url, url: request.nextUrl.href });
  }

  console.log(
    "IsMe: ",
    isMe,
    "isTesting: ",
    isTesting,
    "cached: ",
    cache.get(`views_${url}`)
  );

  await ConnectDb();
  const viewData = await View.findOne({ url });
  let views = viewData ? viewData.views : 0;

  if (!isMe) {
    const lastIncrementKey = `last_increment_${url}`;
    const lastIncrement = cache.get<number>(lastIncrementKey);
    const now = Date.now();

    if (!lastIncrement || now - lastIncrement > 180000) {
      views++;
      await View.findOneAndUpdate(
        { url },
        { $set: { views } },
        { upsert: true }
      );
      cache.set(lastIncrementKey, now);
    }
  }

  cache.set(cacheKey, views);
  return views;
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
          ${icons[options.icon as string](style.iconColor)}
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
  if (number < 1000) return number.toString();
  if (number >= 1e9) return `${(number / 1e9).toFixed(1).replace(/\.0$/, "")}B`;
  if (number >= 1e6) return `${(number / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
  if (number >= 1e3) return `${(number / 1e3).toFixed(1).replace(/\.0$/, "")}K`;
  return number.toLocaleString("en-US");
}
