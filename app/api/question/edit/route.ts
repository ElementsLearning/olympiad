import connectMongo from "@/lib/connectMongo";
import Question from "@/models/QuestionModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  
  const { question } = await request.json();

  try {

    await connectMongo()

    const newQuestion = await Question.findByIdAndUpdate(question._id, { ...question }, { new: true })
    newQuestion.save()

    return NextResponse.json({ question: newQuestion });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Cant Edit Question" });
  }
}
