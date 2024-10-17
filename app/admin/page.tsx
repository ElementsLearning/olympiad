"use client"
import { QuestionTable } from "./QuestionTable";
import { AddCategory } from "@/components/AddCategory";
import { AddSubcategory } from "@/components/AddSubcategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/lib/hooks/useCategories";
import { useState } from "react";


export default function Admin() {

  const [Categories, setCategories] = useCategories()
  const [filter, setFilter] = useState<string>("")
  const [filterWord, setFilterWord] = useState<string>("")

  return (
    <div className="flex flex-col p-4 gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Admin Panel</h1>
        <div className="flex gap-2">
          <Input value={filter} onChange={(e) => setFilter(e.target.value)} />
          <Button variant={"outline"} onClick={() => setFilterWord(filter.trim())}>Filter</Button>
        </div>
        <div className="flex gap-4">
          <AddCategory setCategories={setCategories} />
          <AddSubcategory categories={Categories} setCategories={setCategories} />
        </div>
      </div>
      <QuestionTable Categories={Categories} filterWord={filterWord} />
    </div>
  );
}