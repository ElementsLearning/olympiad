import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { useEffect, useState } from "react"
import { QuestionForm } from "@/components/QuestionForm"

type EditModalProps = {
  Question: QuestionType
  Categories: Record<string, string[]>
  onEdit: (Question: QuestionType) => void
}

export const EditModal: React.FC<EditModalProps> = ({Question, onEdit, Categories}) => {

  const [editingQuestion, setEditingQuestion] = useState<QuestionType>(Question)
  const [dialogOpen, setDialogOpen] = useState(false)

  const onSubmit = async (Question: QuestionType) => {
    const { question } = await (await fetch("/api/question/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({question: Question})
    })).json()

    if (question) {
      onEdit(question)
      setDialogOpen(false)
    }

    if (question) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    setEditingQuestion(Question)
  }, [dialogOpen])

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-none" variant={"ghost"} size={"icon"}><Edit className="size-4" /></Button>
      </DialogTrigger>
      <DialogContent>
        <QuestionForm editing Question={editingQuestion} setQuestion={setEditingQuestion} Categories={Categories} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
