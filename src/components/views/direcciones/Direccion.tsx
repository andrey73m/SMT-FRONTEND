import BotonEditar from "@/components/layout/general/BotonEditar";
import BotonEliminar from "@/components/layout/general/BotonEliminar";
import DataDireccion from "@/models/DataDireccion";
import direccionesService from "@/services/direccionesService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Bounce, toast } from "react-toastify";
import FormularioDireccion from "@/components/formularios/direccion";
import DialogoMostrar from "@/components/UI/DialogoMostrar";
interface DireccionesProps {
  direccion: DataDireccion
}

const Direccion = ({ direccion }: DireccionesProps) => {
  
  const queryClient = useQueryClient()

  

  const mutacionEliminarDireccion = useMutation<DataDireccion>({
    mutationFn: () => direccionesService.eliminarDireccion(direccion.iddireccion),
    onSuccess: (deleted) => {
      toast("Direccion eliminada", {
        autoClose: 5000,
        hideProgressBar: false,
        draggable: true,
        progress: 0,
        theme: "light",
        transition: Bounce,
        className: "bg-green-300 w-96 select-none text-green-800 p-2 rounded-sm my-2",
      })
      const data = queryClient.getQueryData<DataDireccion[]>(["direcciones"])
      queryClient.setQueryData(["direcciones"], data?.map(direccion => direccion.iddireccion === deleted.iddireccion ? deleted : direccion))
    },
    onError: (error) => {
      const e = error as AxiosError<{error: string}>
      toast(e.response?.data.error, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "bg-red-300 w-96 select-none text-red-600 p-2 rounded-sm my-2",

      })
    } ,
  });

  const handleDelete = async () => {
    if (direccion.iddireccion)

      mutacionEliminarDireccion.mutate()
  }

  return (
    <>
      <div className="rounded-xl bg-white w-auto">
        <div className="flex justify-end h-0">
          <div className="my-7 mx-2 flex justify-end min-h-10">
            
            <BotonEditar/>
            <DialogoMostrar>
              <div className="relative">
                <div className="flex justify-end absolute w-full">
                  <BotonEliminar className="h-10"/>
                </div>
                <FormularioDireccion modoActualizar direccion={direccion}/>
              </div>
            </DialogoMostrar>
            <BotonEliminar onClick={handleDelete}/>
          </div>
        </div>
        
        <div className="p-2 *:leading-10">
          <p className=" text-2xl">{direccion.cadena_direccion}</p>
          <p className="font-light text-xl">{direccion.barrio}</p>
          <p className="font-light text-xl">{direccion.predeterminada}</p>
        </div>
      </div>
    </>
  
  )

}

export default Direccion;
