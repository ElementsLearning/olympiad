import { defaultQuestion } from "@/lib/constants"
import { isQuestionComplete } from "@/lib/utils"
import { useEffect, useState } from "react"
import { FormButton } from "@/components/formComponents/FormButton";
import { FormInput } from "@/components/formComponents/FormInput";
import { LabeledSelect } from "@/components/formComponents/LabeledSelect";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

const Group: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="flex gap-2 flex-col sm:flex-row">
      {children}
    </div>
  )
}

type QuestionFormProps = {
  Question?: QuestionType
  setQuestion: (question: QuestionType) => void
  Categories: Record<string, string[]>
  onSubmit: (Question: QuestionType) => Promise<boolean>
  editing?: boolean
}

export const QuestionForm: React.FC<QuestionFormProps> = ({Question=defaultQuestion, setQuestion, Categories, onSubmit, editing=false}) => {
  
  const { bookName, chapter, exercise, questionNumber, level, questionType, class: className, category, subcategory } = Question

  const availableSubcategories = Categories[category as keyof typeof Categories] || ["Select a Subcategory"]
  const allowedOptions = availableSubcategories.filter(sub => !subcategory.includes(sub))

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async () => {
    const status = isQuestionComplete(Question)
    if (status.isComplete) {
      if (await onSubmit(Question)) {
        setSuccess(`Question ${editing ? "edited" : "added"} successfully`)
      }
    } else {
      setError(status.error)
    }
  }

  useEffect(() => {
    if (error !== "") {
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }, [error])
  
  useEffect(() => {
    if (success !== "") {
      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }, [success])

  return (
    <div className="w-full max-w-[750px] bg-neutral-900 p-4 rounded-lg flex flex-col gap-2">
      <h1 className="font-mono font-bold text-center text-2xl">{`${editing ? "Edit" : "Add"} Question`}</h1>
      <FormInput label="Book Name" value={bookName} setValue={(value) => setQuestion({ ...Question, bookName: value })} />
      <Group>
        <FormInput label="Chapter" value={chapter} setValue={(value) => setQuestion({ ...Question, chapter: value })} />
        <FormInput label="Exercise" value={exercise} setValue={(value) => setQuestion({ ...Question, exercise: value })} />
      </Group>
      <Group>
        <FormInput label="Question Number" value={questionNumber} setValue={(value) => setQuestion({ ...Question, questionNumber: value })} />
        <FormInput label="Question Type" value={questionType} setValue={(value) => setQuestion({ ...Question, questionType: value })} />
      </Group>
      <Group>
        <FormInput label="Class" value={className} setValue={(value) => setQuestion({ ...Question, class: value })} />
        <FormInput label="Level" value={level} setValue={(value) => setQuestion({ ...Question, level: value })} />
      </Group>
      <LabeledSelect label="Category" options={Object.keys(Categories)} value={category} onChange={(value) => setQuestion({ ...Question, category: value, subcategory: [""] })} />
      {subcategory.map((sub, i) =>
        <div className="flex gap-2 items-center">
          <Button variant={"ghost"} size={"icon"} className="size-6 p-1"
          onClick={() => setQuestion({ ...Question, subcategory: subcategory.filter((_, index) => index !== i) })}>
            <XIcon className=""/>
          </Button>
          <LabeledSelect key={i} label={`Subcategory ${i + 1}`} options={availableSubcategories} allowedOptions={allowedOptions} value={subcategory[i]} onChange={(value) => setQuestion({ ...Question, subcategory: [...subcategory.slice(0, i), value, ...subcategory.slice(i + 1)] })} />
        </div> 
      )}
      {error && <p className="font-mono text-red-500">{error}</p>}
      {success && <p className="font-mono text-green-500">{success}</p>}
      <Group>
        <FormButton disabled={allowedOptions.length === 0 || availableSubcategories.length === subcategory.length} text="Add Subcategory" onClick={() => setQuestion({ ...Question, subcategory: [...subcategory, ""] })} />
        <FormButton text="Clear" onClick={() => setQuestion(defaultQuestion)} />
      </Group>
      <FormButton text="Submit" onClick={handleSubmit} />
    </div>
  )
}
