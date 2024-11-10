import { NextRequest, NextResponse } from "next/server";
import { ConnectDb } from "@/app/lib/connect";
import { View } from "@/app/lib/model";
import NodeCache from "node-cache";
import { colorStyles } from "@/app/lib/colorStyles";

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
  bgColor?: string | null;
  textColor?: string | null;
  iconColor?: string | null;
  viewsBgColor?: string | null;
  viewsColor?: string | null;
  gradientStart?: string | null;
  gradientEnd?: string | null;
}

const cache = new NodeCache({ stdTTL: 120, checkperiod: 120 });

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

  const searchParams = request.nextUrl.searchParams;
  const options: SVGOptions = {
    text: searchParams.get("text") || "Profile Views",
    colorStyle: (searchParams.get("colorStyle") || "5") as
      | "1"
      | "2"
      | "3"
      | "4"
      | "5"
      | "6"
      | "7"
      | "8"
      | "9"
      | "10"
      | "11"
      | "12"
      | "13"
      | "14"
      | "15"
      | "16"
      | "17"
      | "18"
      | "19"
      | "20"
      | "21"
      | "22"
      | "23"
      | "24"
      | "25"
      | "26"
      | "27"
      | "28"
      | "29"
      | "30",
    // Lol🤣
    icon: (searchParams.get("icon") || "eye") as keyof typeof icons,
    scale: parseFloat(searchParams.get("scale") || "1"),
    borderRadius: parseInt(searchParams.get("borderRadius") || "20"),
    fontFamily: searchParams.get("fontFamily") || "Arial, sans-serif",
    fontSize: parseInt(searchParams.get("fontSize") || "14"),
    fontWeight: searchParams.get("fontWeight") || "bold",
    iconSize: parseInt(searchParams.get("iconSize") || "24"),
    padding: parseInt(searchParams.get("padding") || "12"),
    gap: parseInt(searchParams.get("gap") || "8"),
    bgColor: searchParams.get("bgColor"),
    textColor: searchParams.get("textColor"),
    iconColor: searchParams.get("iconColor"),
    viewsBgColor: searchParams.get("viewsBgColor"),
    viewsColor: searchParams.get("viewsColor"),
    gradientStart: searchParams.get("gradientStart"),
    gradientEnd: searchParams.get("gradientEnd"),
  };

  try {
    await ConnectDb();

    const now = Date.now();
    let viewData;
    const cachedTimestamp: number | undefined = cache.get(url);
    if (cachedTimestamp && now - cachedTimestamp < 120000) {
      console.log("Cooldown active - not incrementing view count");
    } else {
      cache.set(url, now);
      viewData = await View.findOneAndUpdate(
        { url },
        { $inc: { views: 1 } },
        { new: true, upsert: true }
      );
      if (viewData) cache.set(`${url}_views`, viewData.views);
    }

    const views = cache.get(`${url}_views`) || viewData?.views || 0;

    const svg = generateSVG(views, options);

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

function generateSVG(views: number, options: SVGOptions): string {
  const baseStyle = colorStyles[options.colorStyle] || colorStyles["1"];
  const style = {
    ...baseStyle,
    bgColor: options.bgColor || baseStyle.bgColor,
    textColor: options.textColor || baseStyle.textColor,
    iconColor: options.iconColor || baseStyle.iconColor,
    viewsBgColor: options.viewsBgColor || baseStyle.viewBgColor,
    viewColor: options.viewsColor || baseStyle.viewColor,
    gradientStart: options.gradientStart || baseStyle.gradientStart,
    gradientEnd: options.gradientEnd || baseStyle.gradientEnd,
  };

  const scaledFontSize = options.fontSize * options.scale;
  const scaledIconSize = options.iconSize * options.scale;
  const scaledPadding = options.padding * options.scale;
  const scaledGap = options.gap * options.scale;

  const textWidth = options.text.length * scaledFontSize * 0.6;
  const viewsTextWidth = Math.max(
    (views.toString().length + 1) * scaledFontSize * 0.6,
    60 * options.scale
  );

  const baseWidth =
    scaledIconSize +
    textWidth +
    viewsTextWidth +
    scaledPadding * 3 +
    scaledGap * 2;
  const width = Math.max(320, baseWidth);
  const height = Math.max(50, scaledIconSize + scaledPadding * 2);

  const scaledWidth = width * options.scale;
  const scaledHeight = height * options.scale;
  const scaledBorderRadius = options.borderRadius * options.scale;

  const iconX = scaledPadding;
  const iconY = (scaledHeight - scaledIconSize) / 2;
  const textX = iconX + scaledIconSize + scaledGap;
  const textY = scaledHeight / 2;
  const viewsX = scaledWidth - viewsTextWidth - scaledPadding;
  const viewsY = scaledPadding / 2;
  const viewsHeight = scaledHeight - scaledPadding;
  const viewsTextX = viewsX + viewsTextWidth / 2;
  const viewsTextY = scaledHeight / 2;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${scaledWidth} ${scaledHeight}">
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
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.2"/>
        </filter>
      </defs>

      <rect width="${scaledWidth}" height="${scaledHeight}" rx="${scaledBorderRadius}" fill="${
    style.bgColor
  }" filter="url(#shadow)" />

      <svg x="${iconX}" y="${iconY}" width="${scaledIconSize}" height="${scaledIconSize}" viewBox="0 0 24 24" fill="none">
        ${icons[options.icon](style.iconColor)}
      </svg>

      <text 
        x="${textX}" 
        y="${textY}" 
        font-family="${options.fontFamily}" 
        font-size="${scaledFontSize}" 
        fill="${style.textColor}" 
        font-weight="${options.fontWeight}"
        dominant-baseline="central"
      >${options.text}</text>

      <rect 
        x="${viewsX}" 
        y="${viewsY}" 
        width="${viewsTextWidth}" 
        height="${viewsHeight}" 
        rx="${viewsHeight / 2}" 
        fill="${style.viewsBgColor}" 
      />

      <text 
        x="${viewsTextX}" 
        y="${viewsTextY}" 
        font-family="${options.fontFamily}" 
        font-size="${scaledFontSize}" 
        fill="${style.viewColor}" 
        text-anchor="middle" 
        dominant-baseline="central" 
        font-weight="${options.fontWeight}"
      >${views.toLocaleString()}</text>
    </svg>
  `;
}
