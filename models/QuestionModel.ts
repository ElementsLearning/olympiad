import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true
  },
  chapter: {
    type: String,
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  questionNumber: {
    type: String,
    required: true,  
  },
  level: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  }
})

export default mongoose.models.Question || mongoose.model("Question", QuestionSchema) 