import cn from "@/cn";

export interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  negar?: boolean
}



const Boton = ({ children, className,...props }: BotonProps) => {
  

  return(
    <button className={cn(" w-full rounded-lg  p-2 text-white", className)} {...props}>{children}</button>
  )
}


export default Boton;