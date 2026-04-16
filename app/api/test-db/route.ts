import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({
      status: "success",
      message: "Connected to MongoDB successfully! 🚀",
      database: "Cluster0",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to MongoDB",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
