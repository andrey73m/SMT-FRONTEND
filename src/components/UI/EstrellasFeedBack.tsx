import { useState } from "react";
import IconoEstrella from "../icons/Estrella";
import cn from "@/cn";


interface EstrellasFeedBackProps {
  cantidad: number;
  valor: number;
  readOnly?: boolean
  className?: string,
  onChange?: (valor: number) => void
}

const EstrellasFeedBack = ({ cantidad = 5, readOnly, className, valor, onChange }: EstrellasFeedBackProps) => {
  const [mouseIn, setMouseIn] = useState(-1)


  const resetMouseIn = () => {
    setMouseIn(-1)
  }


  const estrellas = Array.from({ length: cantidad }, (_, i) => {
    const isUnderValue = i <= Number(valor) - 1
    const isUnderMouseIn = i <= mouseIn
    return (
      <span
        key={i}
        onMouseEnter={() => { !readOnly && setMouseIn(i) }}
        onClick={() => { !readOnly && onChange && onChange(i + 1)}}
        className={cn("text-amber-400 h-full", {
          "text-amber-200": isUnderMouseIn && !isUnderValue
        })}>
        <IconoEstrella filled={isUnderMouseIn || isUnderValue} />
      </span>
    )
  }
  )

  return (
    <div className="inline-block">
      <div className={cn("flex gap-x-2 h-12 items-center", className)} onMouseLeave={resetMouseIn}>
        {estrellas}
      </div>
    </div>

  );
}

export default EstrellasFeedBack;