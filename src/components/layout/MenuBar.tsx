import IconoMenu from "../icons/Menu";
import { useState, useEffect } from "react";
import MenuFlotante from "./MenuFlotante";

const MenuBar = () => {


  const BotonMenu = () => {
    const [abierto, setAbierto] = useState(false)

    const handleClose = () => {
      setAbierto(false)
    }
    const clickHandler = () => {
      setAbierto(true)
      document.addEventListener("mousedown",handleClose)
    }
    useEffect(() => {document.removeEventListener("mousedown", handleClose)} , [])

    return (
      <>
        <IconoMenu onClick={clickHandler}/>
        <MenuFlotante abierto={abierto}/>
      </>
    )
  }

  return (
    
    <div className="flex justify-end w-full h-10 bg-indigo-950 text-white pr-3">
      <BotonMenu/>
    </div>
  )
}

export default MenuBar;