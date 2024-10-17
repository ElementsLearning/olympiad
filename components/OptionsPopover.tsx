import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash } from "lucide-react"
import { useState } from "react"
import { EditModal } from "./EditModal"

type OptionsPopoverProps = {
  Question: QuestionType
  onDelete: () => void
  onEdit: (Question: QuestionType) => void
  Categories: Record<string, string[]>
}

export const OptionsPopover: React.FC<OptionsPopoverProps> = ({onDelete, onEdit, Question, Categories}) => {
  
  const [popoverOpen, setPopoverOpen] = useState(false)
  
  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MoreHorizontal className="size-4"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit p-0">
        <EditModal Categories={Categories} Question={Question} onEdit={(question) => {onEdit(question); setPopoverOpen(false)}} />
        <Button onClick={() => {onDelete(); setPopoverOpen(false)}} className="rounded-none" variant={"destructive"} size={"icon"}><Trash className="size-4" /></Button>
      </PopoverContent>
    </Popover>
  )
}