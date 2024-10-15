"use client"
import { useQuestions } from "@/lib/hooks/useQuestions";
import { useState } from "react";
import { PaperForm } from "./PaperForm";

type QuestionCardType = {
  question: QuestionType
  index: number
}

const QuestionCard: React.FC<QuestionCardType> = ({question, index}) => {

  const { bookName, chapter, exercise, questionNumber, level, questionType, class: className, category, subcategory } = question

  return (
    <div className="flex flex-col p-4 rounded-md bg-gradient-to-br from-neutral-800 to-neutral-700 text-white">
      <p className="text-xl font-bold">{`Question ${index + 1}`}</p>
      <p className=""><span className="font-bold italic mr-2">Book Name:</span>{bookName}</p>
      <p className=""><span className="font-bold italic mr-2">Chapter:</span>{chapter}</p>
      <p className=""><span className="font-bold italic mr-2">Exercise:</span>{exercise}</p>
      <p className=""><span className="font-bold italic mr-2">Question Number:</span>{questionNumber}</p>
      <p className=""><span className="font-bold italic mr-2">Type:</span>{questionType}</p>
      <p className=""><span className="font-bold italic mr-2">Class:</span>{className}</p>
      <p className=""><span className="font-bold italic mr-2">Category:</span>{category}</p>
      <p className=""><span className="font-bold italic mr-2">Subcategories:</span>{subcategory.join(", ")}</p>
    </div>

  )
}

export default function Paper() {

  const [Questions, setQuestions] = useQuestions()
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionType[]>([])
  
  return (
    <div className="flex flex-col p-4 items-center justify-cente gap-4 min-h-screen">
      <PaperForm Questions={Questions} setFilteredQuestions={setFilteredQuestions}/>
      <div className="grid grid-cols-3 w-full gap-2">
        {filteredQuestions.map((question, index) => (
          <QuestionCard key={index} question={question} index={index}/>
        ))}
      </div>
    </div>
  )
}
