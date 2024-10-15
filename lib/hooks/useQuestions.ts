import { useEffect, useState } from "react"

export const useQuestions = (): [QuestionType[], React.Dispatch<React.SetStateAction<QuestionType[]>>] => {
  const [Questions, setQuestions] = useState<QuestionType[]>([])

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/question/all")
      const { questions } = await response.json()
      setQuestions(questions)
    }
    fetchQuestions()
  }, [])

  return [Questions, setQuestions]
}