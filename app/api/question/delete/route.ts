import connectMongo from "@/lib/connectMongo";
import Question from "@/models/QuestionModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  
  const { id } = await request.json();

  try {

    await connectMongo()

    const deletedQuestion = await Question.findByIdAndDelete(id)

    return NextResponse.json({ question: deletedQuestion });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Cant Delete Question" });
  }
}
