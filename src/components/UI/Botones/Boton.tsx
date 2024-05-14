import cn from "@/cn";

export interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  negar?: boolean
}



const Boton = ({ children, className, negar,...props }: BotonProps) => {
  let change = "";
  if (className) {
    const bgColorIndex = className.indexOf("bg-")
    if (bgColorIndex > -1) {
      const subClass = className.substring(bgColorIndex + 3)
      const bgColorLastIndex = subClass.indexOf(" ")

      if (bgColorLastIndex > -1) change = `bg-slate-200 hover:bg-slate-300 text-${subClass.substring(0, bgColorLastIndex)}`
    }
  }

  return(
    <button className={cn(" w-full rounded-lg  p-2 text-white", className, {
      [change]: negar
    })} {...props}>{children}</button>
  )
}


export default Boton;