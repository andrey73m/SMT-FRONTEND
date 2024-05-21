import IconoCarritoCompras from "@/components/icons/CarritoCompras";
import BotonTopBar from "./Boton";
import { useDataProductosCarritoCompras, useProductosCarritoCompras } from "@/hooks/carritoCompras";
import { useAppDispatch } from "@/store";
import { setCarritoCompras } from "@/store/features/TopBar";
import { useEffect } from "react";
import PuntoIndicador from "../PuntoIndicador";

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
      <BotonTopBar className="w-12" onClick ={handleOpen}>
        <IconoCarritoCompras/>
        {data &&
          <PuntoIndicador className="absolute right-1 bottom-1">
            <p>{data.length}</p>
          </PuntoIndicador>
        }
      </BotonTopBar>
    );
}
 
export default BotonCarritoCompras;