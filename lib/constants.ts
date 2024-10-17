
export const LEVELS = ["1", "2", "3", "4"]
export const CLASSES = ["Graphical", "Non-Graphical"]
export const QUESTION_TYPES = ["Curriculum", "Logic", "High Achiever"]

export const defaultQuestion: QuestionType = {
  bookName: "",
  chapter: "",
  exercise: "",
  questionNumber: "",
  level: "",
  questionType: "",
  class: "",
  category: "",
  subcategory: [""],
}

export const headers: Record<string, keyof QuestionType> = {
  "Book Name": "bookName",
  "Chapter": "chapter",
  "Exercise": "exercise",
  "Question Number": "questionNumber",
  "Level": "level",
  "Question Type": "questionType",
  "Class": "class",
  "Category": "category",
  "Subcategories": "subcategory",
}