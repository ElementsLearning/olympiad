import { FormButton } from "@/components/formComponents/FormButton"
import { FormInput } from "@/components/formComponents/FormInput"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

const Group = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      {children}
    </div>
  )
}

type AddCategoryProps = {
  setCategories: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
}

export const AddCategory: React.FC<AddCategoryProps> = ({setCategories}) => {
  
  const [Name, setName] = useState("")
  const [Subcategories, setSubcategories] = useState<string[]>([""])

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddCategory = async () => {
    const { category } = await (await fetch("/api/category/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: {
          name: Name,
          subcategories: Subcategories
        }
      }),
    })).json()

    if (category) {
      setCategories(c => ({...c, [category.name]: category.subcategories}))
      setDialogOpen(false)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Initialize a Category by adding its first subcategory
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <FormInput label="Category Name" value={Name} setValue={setName}/>
          {Subcategories.map((subcategory, index) => (
            <FormInput
              key={index}
              label={`Subcategory Name (${index + 1})`}
              value={subcategory}
              setValue={(value) => {
                const newSubcategories = [...Subcategories]
                newSubcategories[index] = value
                setSubcategories(newSubcategories)
              }}
            />
          ))}
          <Group>
            <FormButton text="Clear Subcategories" onClick={() => setSubcategories([""])} />
            <FormButton text="Add Subcategory" onClick={() => setSubcategories([...Subcategories, ""])} />
          </Group>
        </div>
        <DialogFooter className="">
          <Button onClick={handleAddCategory} className="w-full">Add Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
