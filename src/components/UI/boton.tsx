interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  campo: string;
};


const Boton = (props: Props) => {
  return(
    <button className=" w-full rounded-lg bg-violet-700 w-32 p-2 text-white hover:bg-violet-500" {...props}>{props.campo}</button> 
  )
}


export default Boton;