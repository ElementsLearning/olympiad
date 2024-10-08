type QuestionTextType = {
  bookName: string
  chapter: string
  exercise: string
  questionNumber: string
  level: string
  questionType: string
  class: string
}

type CategoryType = {
  category: string
  subcategories: string[]
}

type QuestionType = QuestionTextType & CategoryType