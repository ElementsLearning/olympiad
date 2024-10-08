import connectMongo from "@/lib/connectMongo"
import { NextResponse } from "next/server"
import Question from "@/models/QuestionModel"


export async function GET() {

  try {
    await connectMongo()

    const questions = await Question.find()

    return NextResponse.json({questions})

  } catch (error) {
    console.log({error})
    return NextResponse.json({error: "Cant Find Questions"})
  }
}