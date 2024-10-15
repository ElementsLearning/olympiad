"use client"
import { FormButton } from "@/components/formComponents/FormButton"
import { FormInput } from "@/components/formComponents/FormInput"
import { LabeledSelect } from "@/components/formComponents/LabeledSelect"
import { Button } from "@/components/ui/button"
import { useCategories } from "@/lib/hooks/useCategories"
import { generateQuestions, getAllBucketCounts } from "@/lib/utils"
import { useEffect, useMemo, useState } from "react"

const Group: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <div className="flex gap-2 flex-col sm:flex-row">
      {children}
    </div>
  )
}

type PaperFormProps = {
  Questions: QuestionType[]
  setFilteredQuestions: (questions: QuestionType[]) => void
}

export const PaperForm: React.FC<PaperFormProps> = ({Questions, setFilteredQuestions}) => {

  const [Categories, setCategories] = useCategories()
  const [remainingCategories, setRemainingCategories] = useState(Categories)

  
  const [Paper, setPaper] = useState({
    level: "",
    paperQuestions: [{count: 0, category: "", subcategory: ""}]
  })

  const counts = useMemo(() => {
    return getAllBucketCounts(Questions, Categories, Paper.level)
  }, [Questions, Categories, Paper.level])

  useEffect(() => {
    const remaining = JSON.parse(JSON.stringify(Categories))
    for (const pQuestion of Paper.paperQuestions) {
      if (remaining[pQuestion.category]) {
        remaining[pQuestion.category] = remaining[pQuestion.category].filter((s: string) => s !== pQuestion.subcategory)
      } else {
        delete remaining[pQuestion.category]
      }
    }
    setRemainingCategories(remaining)
  }, [Paper.paperQuestions, Categories])

  const {level, paperQuestions} = Paper

  return (
    <div className="w-full max-w-[750px] bg-neutral-900 p-4 rounded-lg flex flex-col gap-2">
      <h1 className="font-mono font-bold text-center text-2xl">Create New Paper</h1>
      <LabeledSelect label="Level" options={["1", "2", "3", "4"]} value={level} onChange={v => setPaper({...Paper, level: v})} />
      {paperQuestions.map((question, index) => (
        <Group key={index}>
          <LabeledSelect label="Category" options={Object.keys(Categories)} allowedOptions={Object.keys(remainingCategories)} value={question.category} onChange={v => setPaper({...Paper, paperQuestions: Paper.paperQuestions.map((q, i) => i === index ? {...q, category: v, subcategory: ""} : q)})} />
          <LabeledSelect label="Subcategory" options={Categories[question.category] || []} allowedOptions={remainingCategories[question.category] || []} value={question.subcategory} onChange={v => setPaper({...Paper, paperQuestions: Paper.paperQuestions.map((q, i) => i === index ? {...q, subcategory: v} : q)})} />
          <div className="flex gap-2 items-center">
            <FormInput
              label="Count"
              value={question.count === 0 ? "" : question.count.toString()}
              setValue={v => setPaper({...Paper, paperQuestions: Paper.paperQuestions.map((q, i) => i === index ? {...q, count: parseInt(v) || 0} : q)})}
            />
            {counts && question.category && question.subcategory &&
            <p>{`/ ${counts[question.category][question.subcategory] || 0}`}</p>}
          </div>
        </Group>
      ))}  
      <FormButton onClick={() => setPaper({...Paper, paperQuestions: [...Paper.paperQuestions, {count: 0, category: "", subcategory: ""} ]})} text="Add Question Set" />
      <Button onClick={() => setFilteredQuestions(generateQuestions(Questions, level, paperQuestions))}>Generate Paper</Button>
    </div>
  )
}
