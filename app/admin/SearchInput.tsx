import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  onClick: () => void
}

export const SearchInput: React.FC<SearchInputProps> = ({value, onChange, onClick}) => {
  
  return (
    <div className="relative">
      <Input className="sm:w-64" value={value} onChange={e => onChange(e.target.value)} />
      <Button variant="ghost" size={"icon"} onClick={onClick} className="absolute right-0 top-0">
        <Search className="size-4" />
      </Button>
    </div>
  )
}
