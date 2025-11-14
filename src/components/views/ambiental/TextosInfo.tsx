import { BotonPrimario } from "@/components/UI/Botones"
import { useState } from "react"

interface TextosInfoRAEEProps{
  messages: string[]
}

const TextosInfoRAEE = ({messages}: TextosInfoRAEEProps)=>{
  const [index, setIndex] = useState<number>(0)
  const messagesLength = messages.length
  const clickPrevious = () => {
    setIndex(c => {
      if (c>0) {
        return c - 1
      }
      return c
    })
  }
  const clickNext = () => {
    setIndex(c => {
      if (c<messagesLength) {
        return c + 1
      }
      return c
    })
  }
  return (
    <section className="border-b-2 py-4">
        <div className="p-5">
          <h3 className="text-2xl font-bold text-gray-500">Sobre los RAEE ({index + 1} de {messagesLength})</h3>
          <div className="flex flex-col gap-y-4 text-xl h-40 py-5">
            {messages[index]}
          </div>
        </div>
        <div className="flex justify-between px-4 font-bold">
          <BotonPrimario onClick={clickPrevious} className="w-32" negar={true} disabled={index === 0}>Anterior</BotonPrimario>
          <BotonPrimario onClick={clickNext} className="w-32" negar={true} disabled={index === messagesLength-1}>Siguiente</BotonPrimario>
        </div>
    </section>
  )
}

export default TextosInfoRAEE