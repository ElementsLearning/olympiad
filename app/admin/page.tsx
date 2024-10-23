"use client"
import { QuestionTable } from "./QuestionTable";
import { AddCategory } from "@/components/AddCategory";
import { AddSubcategory } from "@/components/AddSubcategory";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/hooks/useCategories";
import { useState } from "react";
import { SearchInput } from "./SearchInput";
import { XIcon } from "lucide-react";
import { FilterQuestionModal } from "./FilterQuestionModal";
import { defaultQuestion } from "@/lib/constants";
import { Authenticator } from "@/components/Authenticator";


export default function Admin() {

  const [Categories, setCategories] = useCategories()
  const [filter, setFilter] = useState<string>("")
  const [filterWord, setFilterWord] = useState<string>("")
  const [filterQuestion, setFilterQuestion] = useState<QuestionType>(defaultQuestion)
  const [finalFilterQuestion, setFinalFilterQuestion] = useState<QuestionType | null>(null)
  const [filteredCount, setFilteredCount] = useState<number>(0)

  return (
    <Authenticator> 
      <div className="flex flex-col p-4 gap-2">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-center font-bold">Admin Panel</h1>
          <div className="flex flex-col gap-2 sm:flex-row justify-between items-center">
            <div className="flex gap-2">
              <AddCategory setCategories={setCategories} />
              <AddSubcategory categories={Categories} setCategories={setCategories} />
            </div>
            <div className="flex gap-2">
              <SearchInput value={filter}  onChange={setFilter} onClick={() => setFilterWord(filter)} />
              <FilterQuestionModal Categories={Categories} filterQuestion={filterQuestion} setFilterQuestion={setFilterQuestion} onSubmit={() => {console.log(filterQuestion); setFinalFilterQuestion(filterQuestion)}} />
              <Button variant={"outline"} size={"icon"} onClick={() => {setFilterWord(""); setFilter(""); setFinalFilterQuestion(null); setFilterQuestion(defaultQuestion)}}><XIcon className="size-4" /></Button>
            </div>
          </div>
        </div>
        <QuestionTable filterQuestion={finalFilterQuestion} setFilteredCount={setFilteredCount} Categories={Categories} filterWord={filterWord} />
      </div>
    </Authenticator>
  );
}