type QuestionTextType = {
  _id?: string
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
  subcategory: string[]
}

type QuestionType = QuestionTextType & CategoryType