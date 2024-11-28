import { ConnectDb } from "@/app/lib/connect";
import { View } from "@/app/lib/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url } = await request.json();

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
