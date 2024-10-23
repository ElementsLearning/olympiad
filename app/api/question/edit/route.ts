import connectMongo from "@/lib/connectMongo";
import Question from "@/models/QuestionModel";
import { NextRequest, NextResponse } from "next/server";
import { format } from 'date-fns'

export async function POST(request: NextRequest) {
  
  const { question } = await request.json();

  const date = format(new Date(), 'dd-MM-yyyy')

  try {

    await connectMongo()

    const newQuestion = await Question.findByIdAndUpdate(question._id, { ...question, date }, { new: true })
    newQuestion.save()

    return NextResponse.json({ question: newQuestion });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Cant Edit Question" });
  }
}
