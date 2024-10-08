import connectMongo from "@/lib/connectMongo";
import Category from "@/models/CategoryModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  
  const { category } = await request.json();

  try {

    await connectMongo()

    const newCategory = await Category.create({ ...category })
    newCategory.save()

    return NextResponse.json({ category: newCategory });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Cant Add Category" });
  }
}
