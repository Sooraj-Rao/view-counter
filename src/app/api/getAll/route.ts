import { ConnectDb } from "@/app/lib/connect";
import { View } from "@/app/lib/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { headers, status: 204 });
  }

  const { url } = await request.json();

  await ConnectDb();
  if (url !== process.env.OWNER) {
    return new NextResponse("Unauthorized", { status: 401, headers });
  }

  try {
    const existingView = await View.find();
    return NextResponse.json({ data: existingView, error: null }, { headers });
  } catch (error) {
    console.error("Failed to get All:", error);
    return new NextResponse("Failed to get All", {
      status: 500,
      headers,
    });
  }
}

export async function OPTIONS() {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  return new NextResponse(null, { headers, status: 204 });
}
