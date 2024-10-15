import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Trash } from "lucide-react"
import { EditModal } from "./EditModal"
import { useEffect, useState } from "react"

type QuestionTableProps = {
  questions: QuestionType[]
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>
  Categories: Record<string, string[]>
}

const headers = [
  "Book Name",
  "Chapter",
  "Exercise",
  "Question Number",
  "Level",
  "Question Type",
  "Class",
  "Category",
  "Subcategories",
]

type OptionsPopoverProps = {
  Question: QuestionType
  onDelete: () => void
  onEdit: (Question: QuestionType) => void
  Categories: Record<string, string[]>
}

const OptionsPopover: React.FC<OptionsPopoverProps> = ({onDelete, onEdit, Question, Categories}) => {
  
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

export const QuestionTable: React.FC<QuestionTableProps> = ({questions, setQuestions, Categories}) => {
  const deleteQuestion = async (id: string) => {
    const { question } = await (await fetch("/api/question/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })).json()

    if (question) {
      setQuestions(questions.filter(q => q._id !== question._id))
    }
  }

  // const [filteredQuestions, setFilteredQuestions] = useState(questions)

  // useEffect(() => {

  //   const setNewFilter = (word: string) => {

  //     if (!word) {
  //       setFilteredQuestions(questions)
  //       return
  //     }

  //     setFilteredQuestions(questions.filter(q => (
  //       q.bookName.toLowerCase().includes(word.toLowerCase()) ||
  //       q.chapter.toLowerCase().includes(word.toLowerCase()) ||
  //       q.exercise.toLowerCase().includes(word.toLowerCase()) ||
  //       q.questionNumber.toLowerCase().includes(word.toLowerCase()) ||
  //       q.level.toLowerCase().includes(word.toLowerCase()) ||
  //       q.questionType.toLowerCase().includes(word.toLowerCase()) ||
  //       q.class.toLowerCase().includes(word.toLowerCase()) ||
  //       q.category.toLowerCase().includes(word.toLowerCase()) ||
  //       q.subcategory.join(", ").toLowerCase().includes(word.toLowerCase())
  //     )))
  //   }
  //   setNewFilter(filteredWord)
  // }, [filteredWord, questions])
  
  return (
    <ScrollArea className="h-[calc(100vh-82px)]">
      <Table>
        <TableCaption>List of All Questions</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, i) => <TableHead key={i}>{header}</TableHead>)}
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question, i) => (
            <TableRow key={question._id || i}>
              <TableCell>{question.bookName}</TableCell>
              <TableCell>{question.chapter}</TableCell>
              <TableCell>{question.exercise}</TableCell>
              <TableCell>{question.questionNumber}</TableCell>
              <TableCell>{question.level}</TableCell>
              <TableCell>{question.questionType}</TableCell>
              <TableCell>{question.class}</TableCell>
              <TableCell>{question.category}</TableCell>
              <TableCell>{question.subcategory.join(", ")}</TableCell>
              <TableCell><OptionsPopover Categories={Categories} Question={question} onEdit={(Question) => setQuestions(questions.map(q => q._id === Question._id ? Question : q))} onDelete={() => deleteQuestion(question._id!)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}
