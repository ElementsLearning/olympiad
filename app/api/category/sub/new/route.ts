import connectMongo from "@/lib/connectMongo";
import Category from "@/models/CategoryModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  
  const { category: categoryName, subcategory } = await request.json();

  try {

    await connectMongo()

    const category = await Category.find({name: categoryName})

    if (!category) {
      return NextResponse.json({ error: "Cant Find Category" });
    }

    const newCategory = await Category.findOneAndUpdate(
      { name: categoryName },
      { $push: { subcategories: subcategory } },
      { new: true }
    ).exec()

    return NextResponse.json({ category: newCategory });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Cant Add Subcategory" });
  }
}
