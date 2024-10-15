import { useEffect, useState } from "react";

export const useCategories = (): [Record<string, string[]>, React.Dispatch<React.SetStateAction<Record<string, string[]>>>] => {
  const [Categories, setCategories] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/category/all")
      const { categories: categoriesArray } = await response.json()
      console.log(categoriesArray)

      const newCategories = categoriesArray.reduce((acc: Record<string, string[]>, category: { name: string; subcategories: string[]; }) => {
        acc[category.name] = category.subcategories
        return acc
      }, {})

      //sort the categories alphabetically
      const sortedCategoriesNames = Object.keys(newCategories).sort((a, b) => a.localeCompare(b))
      const sortedCategories: Record<string, string[]> = {}

      for (const name of sortedCategoriesNames) {
        sortedCategories[name] = newCategories[name]
      }

      setCategories(sortedCategories)
    }
    fetchCategories()
  }, [])

  return [Categories, setCategories]
}