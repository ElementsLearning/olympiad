import { FormButton } from "@/components/formComponents/FormButton"
import { FormInput } from "@/components/formComponents/FormInput"
import { LabeledSelect } from "@/components/formComponents/LabeledSelect"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import React, { useState } from "react"

type AddSubcategoryProps = {
  categories: Record<string, string[]>
  setCategories: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
}

export const AddSubcategory: React.FC<AddSubcategoryProps> = ({categories, setCategories}) => {
  
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState("")
  const [Name, setName] = useState("")

  const handleAddSubcategory = async () => {
    const { category: fetchedCategory } = await (await fetch("/api/category/sub/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        subcategory: Name,
      })
    })).json()

    if (fetchedCategory) {
      setCategories(c => ({...c, [fetchedCategory.name]: fetchedCategory.subcategories}))
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Subcategory</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subcategory</DialogTitle>
          <DialogDescription>
            Choose a Category and add a subcategory to it
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <LabeledSelect label="Category" options={Object.keys(categories)} value={category} onChange={setCategory}/>
          <FormInput label="Subcategory Name" value={Name} setValue={setName}/>
        </div>
        <DialogFooter className="">
          <Button onClick={handleAddSubcategory} className="w-full">Add Subcategory</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
