import React, { useState } from "react";
import IconoEstrella from "../icons/Estrella";
import cn from "@/cn";

interface EstrellasFeedBackProps extends React.InputHTMLAttributes<HTMLInputElement>{
  max: number;
  defaultValue: number;
  value: number
}
 
const EstrellasFeedBack  = ({  defaultValue = 0, max = 5 }: EstrellasFeedBackProps) => {
  const [valor, setValor] = useState(defaultValue)
  const [mouseIn, setMouseIn] = useState(-1)


  const resetMouseIn = () => {
    setMouseIn(-1)
  }


  const estrellas = Array.from({ length:max },(_,i) => {
    const isUnderValue = i <= valor - 1
    const isUnderMouseIn = i <= mouseIn
    return (
      <span
        key={i}
        onMouseEnter={() => setMouseIn(i)}
        onClick={() => setValor(i + 1)}
        className={cn("text-amber-400 h-full", {
          "text-amber-200": isUnderMouseIn && !isUnderValue
        })}>
        <IconoEstrella filled={isUnderMouseIn || isUnderValue}/>
      </span>
    )
  }
  )
  
  return (
    <div className="inline-block">
      <div className="flex gap-x-2 h-12 items-center" onMouseLeave={resetMouseIn}>
        {estrellas}
      </div>
    </div>

  );
}
 
export default EstrellasFeedBack;