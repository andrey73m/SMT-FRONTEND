
interface Props extends React.FormHTMLAttributes<HTMLFormElement>{
  titulo: string;
}

const FormularioAuth = ({ className, ...props }: Props) => {
  return(
    <div className="w-screen h-screen flex items-center bg-gradient-to-tr from-violet-900 to-cyan-800 text-white justify-center">

      <form {...props}  className={`rounded-lg bg-indigo-900 w-full max-w-96 flex flex-col items-center shadow-lg justify-normal p-5 ${className}`}>
        <h1 className="mb-5 font-bold text-3xl">{ props.titulo }</h1>
        { props.children }
      </form>
    </div>

  )
}

export default FormularioAuth;