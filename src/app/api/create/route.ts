import { ConnectDb } from "@/app/lib/connect";
import { View } from "@/app/lib/model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { url } = await request.json();
  await ConnectDb();
  if (!url) {
    return new NextResponse("URL is required", { status: 400 });
  }

  try {
    const existingView = await View.findOne({ url });

    if (existingView) {
      return NextResponse.json({
        error: "URL already exists",
        status: 400,
      });
    }

    const newView = new View({ url });
    await newView.save();

    return NextResponse.json({ url });
  } catch (error) {
    if (error instanceof Error && error.message === "Counter already exists") {
      return new NextResponse("URL already exists", { status: 400 });
    }
    console.error("Error creating counter:", error);
    return new NextResponse("An error occurred while creating the counter", {
      status: 500,
    });
  }
}
