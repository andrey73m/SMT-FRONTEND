
interface Props extends React.FormHTMLAttributes<HTMLFormElement>{
  titulo: string;
}

const FormularioAuth = ({ className, ...props }: Props) => {
  return(
    <div className="w-screen h-lvh overflow-y-auto flex items-center animate-gradient-xy bg-gradient-to-tr from-violet-900 to-cyan-800 text-white justify-center">

      <form {...props} className={`rounded-lg bg-gradient-to-t from-violet-800 to-indigo-900 w-full max-w-xl flex flex-col items-center shadow-lg justify-normal p-5 ${className}`}>
        <h1 className="mb-5 font-bold text-2xl sm:text-3xl">{ props.titulo }</h1>
        { props.children }
      </form>
    </div>

  )
}

export default FormularioAuth;