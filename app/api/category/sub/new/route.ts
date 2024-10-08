import connectMongo from "@/lib/connectMongo";
import Question from "@/models/QuestionModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  
  const { question } = await request.json();

  try {

    await connectMongo()

    const newQuestion = await Question.create({ ...question })
    newQuestion.save()

    return NextResponse.json({ question: newQuestion });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Cant Add Question" });
  }
}
