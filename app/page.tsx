"use client"
import { useQuestions } from "@/lib/hooks/useQuestions";
import { useState } from "react";
import { PaperForm } from "../components/PaperForm";
import { QuestionCard } from "@/components/QuestionCard";

export default function Paper() {

  const [Questions, setQuestions] = useQuestions()
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionType[]>([])
  
  return (
    <div className="flex flex-col p-4 items-center justify-center gap-4 min-h-screen">
      <PaperForm Questions={Questions} setFilteredQuestions={setFilteredQuestions}/>
      <div className="grid grid-cols-3 w-full gap-2">
        {filteredQuestions.map((question, index) => (
          <QuestionCard key={index} question={question} index={index}/>
        ))}
      </div>
    </div>
  )
}
