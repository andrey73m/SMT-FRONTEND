interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{}


const Boton = ({ children,...props }: Props) => {
  return(
    <button className=" w-full rounded-lg bg-violet-700 p-2 text-white hover:bg-violet-500" {...props}>{children}</button>
  )
}


export default Boton;