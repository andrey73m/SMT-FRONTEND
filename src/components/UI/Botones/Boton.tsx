import cn from "@/cn";

export interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  negar?: boolean
  simplificar?: boolean
}



const Boton = ({ children, simplificar, className,...props }: BotonProps) => {
  
  console.log("SIMPLIFICADO:",simplificar)
  return(
    <button className={cn(" w-full rounded-lg  p-2 text-white focus:outline-none", className, {
      "bg-transparent inline-block enabled:hover:underline enabled:hover:bg-transparent font-normal enabled:hover:font-bold": simplificar
    })} {...props}>{children}</button>
  )
}


export default Boton;