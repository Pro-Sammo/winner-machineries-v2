import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/Category";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  await dbConnect();
  const categories = await Category.find().sort({ createdAt: -1 });
  return NextResponse.json(categories);
} 