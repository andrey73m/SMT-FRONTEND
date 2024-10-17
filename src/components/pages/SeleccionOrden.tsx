import { ChangeSortFunc, TDirectionOrdering } from "@/models/Paginacion";
import IconoFlechaOrden from "../icons/FlechaOrden";
import { useEffect, useState } from "react";
import cn from "@/cn";
import IconoChulo from "../icons/Chulo";
import { CapitalizeString } from "@/utils";

interface SeleccionOrdenProps<T extends readonly string[]> {
  changeSort: ChangeSortFunc<T>
  options: T
  noSelectionText?: string
  defaultSelected?: T[number]
}

interface OpcionSeleccionProps extends React.HTMLAttributes<HTMLSpanElement> {
  nombre: string
  selected: boolean
  canUnselect?: boolean
}

const OpcionSeleccion = ({ nombre, selected, canUnselect, ...props }:OpcionSeleccionProps) => {
  console.log(`${nombre}: ${props.onClick}`)
  return(
    <span {...props} className={cn("flex items-center gap-1 px-4 py-1 rounded-full border-2 transition-all cursor-default",{
      "bg-gray-300   border-gray-600 text-gray-600 hover:text-gray-200 hover:border-gray-700 hover:bg-gray-400 cursor-pointer": !selected,
      "bg-teal-100 border-teal-400 text-teal-600": selected,
      "cursor-pointer hover:text-teal-700 hover:border-teal-500 hover:bg-teal-200": canUnselect
    })}>
      {
        selected &&
        <IconoChulo className="w-4 h-4"/>
      }
      {CapitalizeString(nombre)}
    </span>
  )
}

const SeleccionOrden = <T extends readonly string[],>({ changeSort, defaultSelected, options, noSelectionText }: SeleccionOrdenProps<T>) => {
  const [direction, setDirection] = useState<TDirectionOrdering>(-1)
  const defaultSelectedIndex = defaultSelected ? options.indexOf(defaultSelected) : -1
  
  const [selected, setSelected] = useState(
    defaultSelectedIndex !== -1 ? defaultSelectedIndex : undefined
  )

  useEffect(() => {
    if (selected === undefined){
      changeSort({})
    }
    else if (selected !== undefined){
      changeSort({
        orderby: [{
          name: options[selected],
          direction
        }]
      })}
  }, [direction, selected])

  return (
    <>
      <h3 className="px-3 py-2 font-bold text-xl">Ordenar por</h3>
      <div className="flex items-center w-full justify-between border-t-[1px] border-b-[1px] border-gray-300 p-2">
        <p className="px-6 text-lg">{
          (selected !== undefined) ?
            CapitalizeString(options[selected])
            :
            (defaultSelected === undefined && (
              noSelectionText ?
                `Por defecto (${noSelectionText})` : "Por defecto"
            ))
        }</p>
        <span onClick={() => setDirection(direction === 1 ? -1 : 1)} className="cursor-pointer hover:bg-gray-200 rounded-full p-1">
          <IconoFlechaOrden  className="w-5 h-5" arriba={direction === 1} />
        </span>
      </div>
      <div className="flex flex-wrap p-2 gap-2">

        {
          options.map((o, i) => {
            const isSelected = i === selected
            
            return <OpcionSeleccion canUnselect={!defaultSelected} onClick={!isSelected || !defaultSelected ? () => setSelected(isSelected && !defaultSelected ? undefined : i) : undefined} key={i} nombre={o} selected={isSelected}/>
          })
        }
      </div>
    </>
  );
}
 
export default SeleccionOrden;