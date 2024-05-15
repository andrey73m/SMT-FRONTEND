import IconoCarritoCompras from "@/components/icons/CarritoCompras";
import BotonTopBar from "./Boton";
import { useQuery } from "@tanstack/react-query";
import tiendaService from "@/services/tiendaService";
import { useDataProductosCarritoCompras, useProductosCarritoCompras } from "@/hooks/carritoCompras";
import { useAppDispatch } from "@/store";
import { setCarritoCompras } from "@/store/features/TopBar";
import { useEffect } from "react";

interface BotonCarritoComprasProps {
  
}
 
const BotonCarritoCompras = () => {
  const { data, isSuccess } = useProductosCarritoCompras()
  const dispatch = useAppDispatch()
  const { setDataCarrito } = useDataProductosCarritoCompras()
  const handleOpen = () => {
    dispatch(setCarritoCompras(true))
  }
  useEffect(() => {
    return () => {
      setDataCarrito()
    }
  },[])
  if (isSuccess)
    return (
      <BotonTopBar onClick ={handleOpen}>
        <IconoCarritoCompras/>
        {data &&
          <span className=" text-xs font-bold w-4 h-4 text-center bg-fuchsia-600 rounded-full absolute right-1 bottom-1 ">
            <p>{data.length}</p>
          </span>
        }
      </BotonTopBar>
    );
}
 
export default BotonCarritoCompras;