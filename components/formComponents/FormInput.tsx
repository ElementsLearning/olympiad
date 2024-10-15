import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

type FormInputProps = {
  value: string,
  setValue: (value: string) => void
  label: string
}

export const FormInput: React.FC<FormInputProps> = ({label, value, setValue}) => {
  return (
    <div className='flex flex-1 flex-col gap-2 relative overflow-hidden pt-2'>
      <input className={`bg-transparent flex-1 peer p-1 focus:outline-none border-b-2 ${value !== "" ? "border-white" : "border-neutral-600"}`} value={value} onChange={(e) => setValue(e.target.value)}>

      </input>
      <div className='absolute left-0 w-full -translate-x-full peer-focus:translate-x-0 bottom-0 h-0.5 bg-white transition-transform duration-500' />
      {value === "" && <p className='uppercase pointer-events-none tracking-widest absolute p-1 text-neutral-600 peer-focus:text-inherit transition-transform duration-300 peer-focus:-translate-y-[calc(50%+2px)] origin-left peer-focus:scale-[80%]'>{label}</p>}
      {value && <p className='uppercase tracking-widest absolute p-1 -translate-y-[calc(50%+2px)] text-neutral-600 origin-left scale-[80%]'>{label}</p>}
    </div>
  )
}