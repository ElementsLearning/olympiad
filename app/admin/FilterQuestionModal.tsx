import { QuestionForm } from "@/components/QuestionForm"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Edit } from "lucide-react"
import { useState } from "react"

type FilterQuestionModalProps = {
  filterQuestion: QuestionType
  Categories: Record<string, string[]>
  setFilterQuestion: (question: QuestionType) => void
  onSubmit: () => void
}

export const FilterQuestionModal: React.FC<FilterQuestionModalProps> = ({filterQuestion, setFilterQuestion, onSubmit, Categories}) => {

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}><Edit className="size-4" /></Button>
      </DialogTrigger>
      <DialogContent>
        <QuestionForm filtering Question={filterQuestion} setQuestion={setFilterQuestion} Categories={Categories} onSubmit={async () => {onSubmit(); setOpen(false); return true}} />
      </DialogContent>
    </Dialog>
  )
}
