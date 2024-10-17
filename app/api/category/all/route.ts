import connectMongo from "@/lib/connectMongo"
import { NextResponse } from "next/server"
import Category from "@/models/CategoryModel"

export const dynamic = 'force-dynamic'

export async function GET() {

  try {
    await connectMongo()

    const categories = await Category.find()

    return NextResponse.json({categories})

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Find Categories"})
  }
}