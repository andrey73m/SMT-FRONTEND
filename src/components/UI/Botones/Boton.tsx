export interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}



const Boton = ({ children, className,...props }: BotonProps) => {
  return(
    <button className={` w-full rounded-lg  p-2 text-white  ${className}`} {...props}>{children}</button>
  )
}


export default Boton;