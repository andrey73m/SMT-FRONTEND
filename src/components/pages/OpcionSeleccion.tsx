import { CapitalizeString } from "@/utils"
import IconoChulo from "../icons/Chulo"
import cn from "@/cn"

interface OpcionSeleccionProps extends React.HTMLAttributes<HTMLSpanElement> {
  nombre: string
  selected: boolean
}

const OpcionSeleccion = ({ nombre, selected, ...props }: OpcionSeleccionProps) => {
  return (
    <span {...props} className={cn("flex items-center gap-1 px-4 py-1 rounded-full border-2 transition-all cursor-default", {
      "bg-gray-300   border-gray-600 text-gray-600 hover:text-gray-200 hover:border-gray-700 hover:bg-gray-400 cursor-pointer": !selected,
      "bg-teal-100 border-teal-400 text-teal-600": selected
    })}>
      {
        selected &&
        <IconoChulo className="w-4 h-4" />
      }
      {CapitalizeString(nombre)}
    </span>
  )
}


export default OpcionSeleccion;