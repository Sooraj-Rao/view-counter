import { ConnectDb } from "@/app/lib/connect";
import { View } from "@/app/lib/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url } = await request.json();
  const responseHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Cache-Control": "no-cache, no-store, must-revalidate",
  };

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: responseHeaders,
    });
  }

  await ConnectDb();
  if (url !== process.env.OWNER) {
    return new NextResponse("Nigga", { status: 401 });
  }

  try {
    const existingView = await View.find();
    return NextResponse.json({ data: existingView, error: null });
  } catch (error) {
    console.error("Failed to get All:", error);
    return new NextResponse("Failed to get All", {
      status: 500,
    });
  }
}
