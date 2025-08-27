import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import QuoteRequest from "@/models/QuoteRequest";

export async function POST(request: Request) {
  try {
    const { name, email, phone, product, message } = await request.json();
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }
    await dbConnect();
    const quote = await QuoteRequest.create({ name, email, phone, product, message });
    return NextResponse.json({ success: true, quote });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit quote request." }, { status: 500 });
  }
} 