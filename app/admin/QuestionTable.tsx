import { OptionsPopover } from "@/components/OptionsPopover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { headers } from "@/lib/constants"
import { useQuestions } from "@/lib/hooks/useQuestions"
import { ArrowDownAZ, ArrowUpAZ, Equal, EqualSquare } from "lucide-react"
import React, { useEffect, useState } from "react"

type QuestionTableProps = {
  Categories: Record<string, string[]>
  filterWord: string
  setFilteredCount: (count: number) => void
  filterQuestion: QuestionType | null
}

const QuestionTableComponent: React.FC<QuestionTableProps> = ({Categories, filterWord, setFilteredCount, filterQuestion}) => {

  const [questions, setQuestions] = useQuestions()
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionType[]>([])
  const [sortKey, setSortKey] = useState<keyof QuestionType | "">("")
  const [sortDirection, setSortDirection] = useState(1)

  const filterQuestions = (q: QuestionType[], word: string) => {
    return q.filter((q) => 
      q.bookName.toLowerCase().includes(word.toLowerCase()) ||
      q.chapter.toLowerCase().includes(word.toLowerCase()) ||
      q.exercise.toLowerCase().includes(word.toLowerCase()) ||
      q.questionNumber.toLowerCase().includes(word.toLowerCase()) ||
      q.level.toLowerCase().includes(word.toLowerCase()) ||
      q.questionType.toLowerCase().includes(word.toLowerCase()) ||
      q.class.toLowerCase().includes(word.toLowerCase()) ||
      q.category.toLowerCase().includes(word.toLowerCase()) ||
      q.subcategory.join(", ").toLowerCase().includes(word.toLowerCase())
    )
  }

  useEffect(() => {
    if (filterQuestion) {
      const filtered = questions.filter(q => {
        const { bookName, chapter, questionNumber, questionType, subcategory, category, class: className, date, exercise, level } = q
        return (
          (!filterQuestion.bookName || bookName.toLowerCase().includes(filterQuestion.bookName.toLowerCase())) &&
          (!filterQuestion.chapter || chapter.toLowerCase().includes(filterQuestion.chapter.toLowerCase())) &&
          (!filterQuestion.questionNumber || questionNumber.toLowerCase().includes(filterQuestion.questionNumber.toLowerCase())) &&
          (!filterQuestion.questionType || questionType.toLowerCase().includes(filterQuestion.questionType.toLowerCase())) &&
          (!filterQuestion.category || category.toLowerCase().includes(filterQuestion.category.toLowerCase())) &&
          (!filterQuestion.class || className.toLowerCase().includes(filterQuestion.class.toLowerCase())) &&
          (!filterQuestion.date || date.toLowerCase().includes(filterQuestion.date.toLowerCase())) &&
          (!filterQuestion.exercise || exercise.toLowerCase().includes(filterQuestion.exercise.toLowerCase())) &&
          (!filterQuestion.level || level.toLowerCase().includes(filterQuestion.level.toLowerCase())) &&
          ((filterQuestion.subcategory.length === 1 && filterQuestion.subcategory[0] === '') || filterQuestion.subcategory.length === 0 || subcategory.some(s => filterQuestion.subcategory.includes(s)))
        )
      })
      setFilteredQuestions(filtered)
      setFilteredCount(filtered.length)
    } else if (filterWord) {
      const filtered = filterQuestions(questions, filterWord)
      setFilteredQuestions(filtered)
      setFilteredCount(filtered.length)
    } else {
      setFilteredQuestions(questions)
      setFilteredCount(questions.length)
    }
  }, [filterQuestion, filterWord, questions])

  useEffect(() => {

    if (sortKey === '_id') return;

    if (sortKey === 'subcategory') {
      setFilteredQuestions([...filteredQuestions].sort((a, b) => sortDirection * a[sortKey].join(",").localeCompare(b[sortKey].join(","))))
    } else if (sortKey === 'date') {
      setFilteredQuestions([...filteredQuestions].sort((a, b) => sortDirection * (new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime())))
    } else if (sortKey) {
      setFilteredQuestions([...filteredQuestions].sort((a, b) => sortDirection * a[sortKey].localeCompare(b[sortKey])))
    } else {
      setFilteredQuestions(filterQuestions(questions, filterWord))
    }
  }, [questions, sortKey, sortDirection])

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

  const pressKey = (key: keyof QuestionType) => {
    if (key === sortKey) {
      if (sortDirection === 1) {
        setSortDirection(-1);
      } else {
        setSortKey("")
        setSortDirection(1)
      }
    } else {
      setSortKey(key)
      setSortDirection(1)
    }
  }
  
  return (
    <ScrollArea className="h-[calc(100vh-180px)] sm:h-[calc(100vh-124px)]">
      <Table>
        <TableCaption>List of All Questions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            {Object.keys(headers).map((header, i) => 
            <TableHead key={i}>
              <div className="flex gap-2 items-center">
                <p>{header}</p>
                <button onClick={() => pressKey(headers[header])} className="bg-transparent hover:bg-white/10 p-1 rounded-md">
                  {sortKey === headers[header] ?
                    sortDirection === 1 ?
                    <ArrowDownAZ className="size-4"/> :
                    <ArrowUpAZ className="size-4"/> :
                    <EqualSquare className="size-4"/>
                  }
                </button>
              </div>
            </TableHead>)}
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        {Categories && filteredQuestions && <TableBody>
          {filteredQuestions.map((question, i) => (
            <TableRow key={question._id || i}>
              <TableCell>{i+1}</TableCell>
              <TableCell>{question.bookName}</TableCell>
              <TableCell>{question.chapter}</TableCell>
              <TableCell>{question.exercise}</TableCell>
              <TableCell>{question.questionNumber}</TableCell>
              <TableCell>{question.level}</TableCell>
              <TableCell>{question.questionType}</TableCell>
              <TableCell>{question.class}</TableCell>
              <TableCell>{question.category}</TableCell>
              <TableCell>{question.subcategory.join(", ")}</TableCell>
              <TableCell className="whitespace-nowrap">{question.date}</TableCell>
              <TableCell>
                <OptionsPopover 
                  Categories={Categories} 
                  Question={question} 
                  onEdit={(Question) => setQuestions(questions.map(q => q._id === Question._id ? Question : q))} 
                  onDelete={() => deleteQuestion(question._id!)}
                  />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </ScrollArea>
  )
}

export const QuestionTable = React.memo(QuestionTableComponent)