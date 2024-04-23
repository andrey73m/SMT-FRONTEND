import { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{};

const Campo = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

  return (
    <input ref={ref} className="w-full m-4 border-b-2 bg-transparent outline-none text-white border-violet-800 focus:border-violet-600 p-1" {...props}/>
  )
})

export default Campo;