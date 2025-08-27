import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/Category";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  await dbConnect();
  const categories = await Category.find().sort({ createdAt: -1 });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const data = await req.json();
  const category = await Category.create(data);
  return NextResponse.json(category, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const { _id, ...update } = await req.json();
  const category = await Category.findByIdAndUpdate(_id, update, { new: true });
  return NextResponse.json(category);
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { _id } = await req.json();
  await Category.findByIdAndDelete(_id);
  return NextResponse.json({ success: true });
} 