import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import QuoteRequest from "@/models/QuoteRequest";

export async function GET() {
  try {
    await dbConnect();
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
    return NextResponse.json({ quotes });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch quote requests." }, { status: 500 });
  }
} 