"use client"
import { FormButton } from "@/components/formComponents/FormButton";
import { FormInput } from "@/components/formComponents/FormInput";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { getSingularValue } from "@/lib/utils";
import { SelectValue } from "@radix-ui/react-select";
import { useState } from "react";

const defaultQuestion: QuestionType = {
  bookName: "",
  chapter: "",
  exercise: "",
  questionNumber: "",
  level: "",
  questionType: "",
  class: "",
  category: "",
  subcategories: [""],
}

const testCategories = ["Mathematics", "Geography", "History", "Science"]
const testSubcategories = {
  "Mathematics": ["Addition", "Subtraction", "Multiplication", "Division"],
  "Geography": ["Countries", "States", "Cities"],
  "History": ["Events", "Religions", "Wonders"],
  "Science": ["Physics", "Chemistry", "Biology", "Geology"]
}

export default function Page() {

  const [question, setQuestion] = useState<QuestionType>(defaultQuestion)

  const getValue = (key: keyof QuestionTextType): string => {
    return question[key]
  }

  const setValue = (key: keyof QuestionTextType, value: string) => {
    setQuestion({
      ...question,
      [key]: value
    })
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col gap-2 p-4 rounded-xl bg-neutral-950 w-2/3">
        <FormInput label={"Book"} value={getValue("bookName")} setValue={(value) => setValue("bookName", value)} />
        <div className="grid grid-cols-2 gap-2">
          <FormInput label={"Chapter"} value={getValue("chapter")} setValue={(value) => setValue("chapter", value)} />
          <FormInput label={"Exercise"} value={getValue("exercise")} setValue={(value) => setValue("exercise", value)} />
          <FormInput label={"Question Number"} value={getValue("questionNumber")} setValue={(value) => setValue("questionNumber", value)} />
          <FormInput label={"Type"} value={getValue("questionType")} setValue={(value) => setValue("questionType", value)} />
          <FormInput label={"Class"} value={getValue("class")} setValue={(value) => setValue("class", value)} />
          <FormInput label={"Level"} value={getValue("level")} setValue={(value) => setValue("level", value)} />
        </div>
        <div className="flex gap-2">
          <Select onValueChange={(value) => setQuestion({...question, category: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {testCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <FormButton onClick={() => console.log("Tested")} text="Test" />
      </div>
    </div>
  )
}