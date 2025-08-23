import { NextRequest, NextResponse } from "next/server";
import { ConnectDb } from "@/app/lib/connect";
import { View } from "@/app/lib/model";
import NodeCache from "node-cache";
import { SendOption, generateSVG } from "@/lib/helper";

const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

export const dynamic = "force-dynamic";

interface Params {
  url: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { url } = params;
  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;
  const isSvgRequired = searchParams.get("svg") !== "false";
  const options = isSvgRequired ? SendOption(searchParams) : null;

  const userIp =
    request.headers.get("x-forwarded-for") || request.ip || "unknown";
  const cacheKey = `views_${url}_${userIp}`;
  const lastIncrementKey = `last_increment_${url}_${userIp}`;

  const responseHeaders = {
    "Content-Type":
      isSvgRequired && options ? "image/svg+xml" : "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Cache-Control": "no-cache, no-store, must-revalidate",
  };

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers: responseHeaders });
  }

  try {
    const views = await getViews(url, userIp, cacheKey, lastIncrementKey);
    if (isSvgRequired && options) {
      return new NextResponse(generateSVG(url, views, options), {
        headers: responseHeaders,
      });
    }
    return NextResponse.json(
      { views, success: true },
      { status: 200, headers: responseHeaders }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}

async function getViews(
  url: string,
  userIp: string,
  cacheKey: string,
  lastIncrementKey: string
): Promise<number> {
  if (url === "test") {
    return 100;
  }

  await ConnectDb();
  const cachedViews = cache.get<number>(cacheKey);
  if (cachedViews !== undefined) {
    console.log("Using cached views for IP:", userIp, cachedViews);
    return cachedViews;
  }

  const now = Date.now();
  const lastIncrement = cache.get<number>(lastIncrementKey);
  const shouldIncrement = !lastIncrement || now - lastIncrement > 180000;

  const update = shouldIncrement ? { $inc: { views: 1 } } : {};
  const viewData = await View.findOneAndUpdate({ url }, update, {
    upsert: true,
    returnDocument: "after",
  });

  const views = viewData?.views || 0;
  if (shouldIncrement) {
    cache.set(lastIncrementKey, now);
  }
  cache.set(cacheKey, views, 300);
  return views;
}
