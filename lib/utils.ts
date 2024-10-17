import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSingularValue = <T>(value: T | T[]): T => {
  if (Array.isArray(value)) {
    return value[0]
  }
  return value
}

type Status = {
  isComplete: boolean
  error: string
}

export const isQuestionComplete = (question: QuestionType): Status => {
  const status = {
    isComplete: true,
    error: ""
  }

  const { bookName, category, class: className, exercise, level, questionNumber, questionType, subcategory } = question

  if (!bookName || !category || !className || !exercise || !level || !questionNumber || !questionType || subcategory.length === 0 || subcategory.includes("")) {
    status.isComplete = false
    status.error = "Please fill out all required fields"  
    return status
  }

  return status
}

type BucketType = {
  count: number
  category: string
  subcategory: string
}

export const pickRandom = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random())

  return shuffled.slice(0, count)
}

export const generateQuestions = (allQuestions: QuestionType[], level: string, buckets: BucketType[]): QuestionType[] => {
  const levelQuestions = allQuestions.filter(q => q.level === level)

  const questionBuckets = buckets.map(b => ({
    ...b,
    questions: levelQuestions.filter(q => q.category === b.category && q.subcategory.includes(b.subcategory))
  }))

  const toReturn = questionBuckets.reduce((acc: QuestionType[], bucket) => {
    // return acc.concat(pickRandom(bucket.questions, bucket.count))
    return acc.concat(bucket.questions)
  }, [])

  console.log(toReturn)

  return toReturn
}

export const getAllBucketCounts = (allQuestions: QuestionType[], Categories: Record<string, string[]>, level: string): Record<string, Record<string, number>> => {

  const levelQuestions = allQuestions.filter(q => q.level === level)

  const toReturn = levelQuestions.reduce((acc: Record<string, Record<string, number>>, question) => {
    const { category, subcategory } = question

    if (!acc[category]) {
      acc[category] = {}
    } 

    for (const sub of subcategory) {
      if (!acc[category][sub]) {
        acc[category][sub] = 0
      }
      acc[category][sub]++
    }

    return acc
  }, {})

  return toReturn
}

type AllBucketType = Record<string, Record<string, Record<string, QuestionType[]>>>

export const generateAllBuckets = (allQuestions: QuestionType[], Categories: Record<string, string[]>): AllBucketType => {
  const toReturn = allQuestions.reduce((acc: AllBucketType, question) => {
    const { category, subcategory, level } = question

    if (!acc[level]) {
      acc[level] = {}
    }

    if (!acc[level][category]) {
      acc[level][category] = {}
    }

    for (const sub of subcategory) {
      if (!acc[level][category][sub]) {
        acc[level][category][sub] = [question]
      }
      acc[level][category][sub] = [...acc[level][category][sub], question]
    }

    
    return acc
  }, {}) 

  return toReturn
}