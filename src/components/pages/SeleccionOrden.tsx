import { ChangeSortFunc, TDirectionOrdering } from "@/models/Paginacion";
import IconoFlechaOrden from "../icons/FlechaOrden";
import { useEffect, useState } from "react";
import cn from "@/cn";
import IconoChulo from "../icons/Chulo";
import { CapitalizeString } from "@/utils";

interface BaseSeleccionOrdenProps<T extends readonly string[]> {
  changeSort: ChangeSortFunc<T>
  // eslint-disable-next-line no-unused-vars
  options: {[key in T[number]]: string}
}

interface NoDefaultProps<T extends readonly string[]> extends BaseSeleccionOrdenProps<T>{
  noSelectionText: string
  defaultSelected?: never
}

interface WithDefaultProps<T extends readonly string[]> extends BaseSeleccionOrdenProps<T> {
  noSelectionText?: never
  defaultSelected: T[number]
}

type SeleccionOrdenProps<T extends readonly string[]> = NoDefaultProps<T> | WithDefaultProps<T>

interface OpcionSeleccionProps extends React.HTMLAttributes<HTMLSpanElement> {
  nombre: string
  selected: boolean
}

const OpcionSeleccion = ({ nombre, selected, ...props }:OpcionSeleccionProps) => {
  return(
    <span {...props} className={cn("flex items-center gap-1 px-4 py-1 rounded-full border-2 transition-all cursor-default",{
      "bg-gray-300   border-gray-600 text-gray-600 hover:text-gray-200 hover:border-gray-700 hover:bg-gray-400 cursor-pointer": !selected,
      "bg-teal-100 border-teal-400 text-teal-600": selected
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
  
  const [selected, setSelected] = useState(
    defaultSelected || undefined
  )

  useEffect(() => {
    if (selected === undefined){
      changeSort({})
    }
    else if (selected !== undefined){
      changeSort({
        orderby: [{
          name: selected,
          direction
        }]
      })}
  }, [direction, selected])

  return (
    <>
      <h3 className="px-3 py-2 font-bold text-xl">Ordenar por</h3>
      <div className="flex items-center w-full justify-between p-2 border-t-[1px] border-b-[1px] border-gray-300">
        <div className="flex flex-col items-center px-6 grow">
          
          <p className="text-lg">{
            (selected !== undefined) ?
              CapitalizeString(options[selected])
              :
              (defaultSelected === undefined &&  (
                `Por defecto (${noSelectionText})`
              ))
          }</p>
          {selected !== undefined && <p className="text-gray-400 text-bold text-sm">({
            direction !== -1 ? "Mayor a menor" : "Menor a mayor"
          })</p>}
        </div>
        <span onClick={() => setDirection(direction === 1 ? -1 : 1)} className="cursor-pointer hover:bg-gray-200 rounded-full p-1">
          {selected !== undefined && <IconoFlechaOrden  className="w-5 h-5" arriba={direction === 1} />}
        </span>
      </div>
      
      <div className="flex flex-wrap p-2 gap-2">
        {
          noSelectionText &&
          <OpcionSeleccion onClick={() => {setSelected(undefined)}} nombre={noSelectionText} selected={selected === undefined} />
        }
        {
          Object.entries<string>(options).map(([k, v]) => {
            const isSelected = k === selected
            return <OpcionSeleccion onClick={() => setSelected(k)} key={k} nombre={v} selected={isSelected}/>
          })
        }
      </div>
    </>
  );
}
 
export default SeleccionOrden;