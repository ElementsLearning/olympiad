// import React, { useState } from 'react';

// const FormSubmitButton: React.FC = () => {
//   const [isActive, setIsActive] = useState(false);

//   const handleClick = () => {
//     setIsActive(true);
//   };

//   return (
//     <div className="w-full flex justify-center items-center">
//       <button
//         onClick={handleClick}
//         className={`border-none p-2 outline-none bg-[#2f2f2f] text-white rounded-sm text-center shadow-lg relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${
//           isActive ? 'bg-[#ff2b75]' : ''
//         }`}
//       >
//         <p className={`transition-all duration-500 ease-in-out ${isActive ? 'mr-24' : ''}`}>
//           {isActive ? 'Thanks' : 'Submit'}
//         </p>
//         <div
//           className={`check-box rounded-sm shadow-md absolute top-0 ${
//             isActive ? 'right-0 opacity-100' : 'right-10 opacity-0'
//           } transition-all duration-500 ease-in-out`}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-9 mx-4">
//             <path
//               fill="transparent"
//               d="M14.1 27.2l7.1 7.2 16.7-16.8"
//               className={`stroke-white stroke-[3px] stroke-dasharray-[34] stroke-dashoffset-[34] stroke-linecap-round transition-all duration-1000 delay-1000 ease-in-out ${
//                 isActive ? 'stroke-dashoffset-0' : ''
//               }`}
//             />
//           </svg>
//         </div>
//       </button>
//     </div>
//   );
// };

// export default FormSubmitButton;

import React from 'react'

type FormButtonProps = {
  color?: string
  text: string
  disabled?: boolean
  onClick: () => void
}

export const FormButton: React.FC<FormButtonProps> = ({text, onClick, color="#FFFFFF", disabled=false}) => {
  return (
    <div className='relative flex-1 p-0 group overflow-hidden'>
      <button disabled={disabled} onClick={onClick} className='w-full p-1 xs:p-2 px-2 xs:px-4 disabled:bg-gray/20 bg-black/40 group/button hover:bg-transparent transition-colors duration-300' style={{color: disabled ? "#aaaaaa" : color}}>
        <p className='group-hover/button:opacity-100 opacity-60 transition-opacity duration-300'>
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

