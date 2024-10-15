import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type LabeledSelectProps = {
  showLabel?: boolean
  label: string
  options: string[]
  allowedOptions?: string[]
  value: string
  onChange: (value: string) => void
}

export const LabeledSelect: React.FC<LabeledSelectProps> = ({label, options, value, onChange, showLabel=false, allowedOptions=options}) => {
  return (
    <div className="flex-1 flex flex-col gap-2 items-center">
      {showLabel && <p className="w-full">{label}</p>}
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className={`w-full rounded-none tracking-widest ${options.some(option => option === value) ? "text-white border-white" : "text-neutral-600 border-neutral-600"} uppercase bg-transparent text-base border-0 border-b-2`}>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent className="backdrop-blur-sm bg-transparent">
          {options.map((option) =>
            <SelectItem disabled={!allowedOptions.includes(option)} key={option} value={option}>
              {option}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
