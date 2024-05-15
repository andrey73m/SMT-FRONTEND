import cn from "@/cn";
import React, { ChangeEvent, forwardRef, useState } from "react";


const BotonContador = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} className="h-full w-12 bg-violet-700 hover:bg-violet-600">{props.children}</button>
}
interface CampoContadorProps {
  min?: number;
  max?: number;
  initial: number
  label: string;
  className?: string;
}

const CampoContador = forwardRef<HTMLInputElement, CampoContadorProps>(({ max,min, initial, label, className }, ref) => {

  const [cantidad, setCantidad] = useState(initial.toString())
  const esMaximo = Number(cantidad) === max;
  const esMinimo = Number(cantidad) === min;
  const handleIncrease = () => {
    if (esMaximo) return;
    const valor = Number(cantidad) + 1
    setCantidad(valor.toString())
  }
  const handleDecrease = () => {
    if (esMinimo) return;
    const valor = Number(cantidad) - 1
    setCantidad(valor.toString())
  }
  const handleBlur = () => {
    const valorFinal = Number(cantidad)
    if (min && valorFinal < min) setCantidad(min.toString())
    if (max && valorFinal > max) setCantidad(max.toString())
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
    const nvalor = Number(valor)
    const isEmpty = valor === ""
    if (!isEmpty && (isNaN(nvalor) || (max && nvalor > max) || (min && nvalor < min))) return;
    setCantidad(valor)
  }
  return (
    <div className="flex h-full justify-start flex-col w-full relative">
      <label className="font-normal text-start absolue">{label}</label>
      <div className={cn("flex items-center gap-x-2 h-12 border-2 border-violet-700 text-white rounded-lg", className)}>
        <BotonContador onClick={handleDecrease} disabled={esMinimo}>-</BotonContador>
        <span className="grow h-full flex items-center justify-center">
          <input className="w-full h-full focus:outline-none text-black text-center" value={cantidad} onChange={handleChange} onBlur={handleBlur} ref={ref}></input>

        </span>
        <BotonContador onClick={handleIncrease} disabled={esMaximo}>+</BotonContador>
      </div>
    </div>
  );
})
 
CampoContador.displayName = "CampoContador";
export default CampoContador;