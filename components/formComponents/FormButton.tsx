import React from 'react'

type FormButtonProps = {
  color?: string
  text: string
  onClick: () => void
}

export const FormButton: React.FC<FormButtonProps> = ({text, onClick, color="#FFFFFF"}) => {
  return (
    <div className='relative flex-1 p-0 group overflow-hidden'>
      <button onClick={onClick} className='w-full p-2 px-4 bg-black/5 group/button hover:bg-transparent transition-colors duration-300' style={{color}}>
        <p className='group-hover/button:opacity-100 opacity-40 transition-opacity duration-300'>
          {text}
        </p>
      </button>
      <div style={{backgroundColor: color}} className='absolute left-0 w-0.5 top-0 bottom-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-500' />
      <div style={{backgroundColor: color}} className='absolute right-0 w-0.5 top-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500' />
      <div style={{backgroundColor: color}} className='absolute top-0 h-0.5 right-0 left-0 translate-x-full group-hover:translate-x-0 transition-transform duration-500' />
      <div style={{backgroundColor: color}} className='absolute bottom-0 h-0.5 right-0 left-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500' />
    </div>
  )
}

