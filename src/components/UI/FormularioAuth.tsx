import cn from "@/cn";
import { useAppDispatch } from "@/store";
import { detenerCarga } from "@/store/features/sesion";
import { useEffect } from "react";
import IconoFlecha from "../icons/Flecha";
import { useNavigate } from "react-router-dom";

interface Props extends React.FormHTMLAttributes<HTMLFormElement>{
  titulo: string;
}

const FormularioAuth = ({ className, ...props }: Props) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    return () => {dispatch(detenerCarga())}
  },[])
  return(
    <div className="w-screen h-lvh overflow-y-auto flex items-center animate-gradient-xy bg-gradient-to-tr from-violet-900 to-cyan-800 text-white justify-center relative">
      <div className="absolute top-10 left-10 flex gap-x-2 h-6 hover:text-violet-300 cursor-pointer select-none" onClick={() => navigate(-1)}>
        <IconoFlecha/>
        Volver
      </div>
      <form {...props} className={cn("rounded-lg bg-gradient-to-t from-violet-800 to-indigo-900 w-full max-w-xl flex flex-col items-center shadow-lg justify-normal p-5 ", className)}>
        <h1 className="mb-5 font-bold text-2xl sm:text-3xl">{ props.titulo }</h1>
        { props.children }
      </form>
    </div>

  )
}

export default FormularioAuth;