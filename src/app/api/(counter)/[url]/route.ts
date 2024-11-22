import { NextRequest, NextResponse } from "next/server";
import { ConnectDb } from "@/app/lib/connect";
import { View } from "@/app/lib/model";
import NodeCache from "node-cache";
import { SendMail } from "@/actions/mail";
import { SendOption, generateSVG } from "@/lib/helper";

const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

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
  const isSvgRequired = searchParams.get("svg") == "false" ? false : true;

  const options = isSvgRequired && SendOption(searchParams);

  const userIp = request.headers.get("x-forwarded-for") || request.ip;
  const cacheKey = `views_${url}_${userIp}`;
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
        console.log("Using cached views for IP:", userIp, views);
      } else {
        viewData = await View.findOne({ url });
        views = viewData ? viewData.views : 0;

        const lastIncrementKey = `last_increment_${url}_${userIp}`;
        const lastIncrement = cache.get(lastIncrementKey) as number;

        if (!lastIncrement || now - lastIncrement > 180000) {
          views++;
          await View.findOneAndUpdate(
            { url },
            { $set: { views: views } },
            { upsert: true }
          );
          cache.set(lastIncrementKey, now);

          await SendMail({
            name: url,
          });
        }

        cache.set(cacheKey, views, 300);
      }
    } else {
      views = 100;
    }
    if (isSvgRequired && options) {
      return new NextResponse(generateSVG(url, views, options), {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    } else {
      return NextResponse.json({ views, success: true }, { status: 200 });
    }
  } catch (error) {
    console.error("Error generating SVG:", error);
    return NextResponse.json(
      { error: "An error occurred while generating the SVG." },
      { status: 500 }
    );
  }
}
