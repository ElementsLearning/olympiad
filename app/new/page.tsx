"use client"
import { defaultQuestion } from "@/lib/constants";
import { useState } from "react";
import { QuestionForm } from "@/components/QuestionForm";
import { useCategories } from "@/lib/hooks/useCategories";


export default function New() {

  const [Question, setQuestion] = useState<QuestionType>(defaultQuestion);
  const [Categories, setCategories] = useCategories()

  const onSubmit = async (Question: QuestionType) => {
    const { question } = await (await fetch("/api/question/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({question: Question})
    })).json()

    if (question) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <QuestionForm Question={Question} setQuestion={setQuestion} Categories={Categories} onSubmit={onSubmit} />
    </div>
  )
}