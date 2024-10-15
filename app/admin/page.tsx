"use client"
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { QuestionTable } from "./QuestionTable";
import { AddCategory } from "./AddCategory";
import { AddSubcategory } from "./AddSubcategory";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/hooks/useCategories";
import { useQuestions } from "@/lib/hooks/useQuestions";


export default function Admin() {

  const [Categories, setCategories] = useCategories()
  const [Questions, setQuestions] = useQuestions()

  return (
    <div className="flex flex-col p-4 gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Admin Panel</h1>
        {/* <div className="flex gap-2 items-center">
          <Input className="w-64" value={filter} onChange={(e) => setFilter(e.target.value)} />
          <Button variant={"outline"} onClick={() => setFilterWord(filter)}>Filter</Button>
        </div> */}
        <div className="flex gap-4">
          <AddCategory setCategories={setCategories} />
          <AddSubcategory categories={Categories} setCategories={setCategories} />
        </div>
      </div>
      <QuestionTable Categories={Categories} setQuestions={setQuestions} questions={Questions} />
    </div>
  );
}