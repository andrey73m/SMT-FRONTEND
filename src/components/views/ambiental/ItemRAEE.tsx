import { VisorTexto } from "@/components/UI";
import { RegistroRAEE } from "@/services/RAEEService";
import Direccion from "../direcciones/Direccion";
import { useEffect, useState } from "react";
import DataDireccion from "@/models/DataDireccion";

interface ItemRAEEProps {
  raee: RegistroRAEE;
  direcciones: DataDireccion[] | []
}

const ItemRAEE = ({ raee, direcciones }: ItemRAEEProps) => {
  
  
  const [direccion, setDireccion] = useState<DataDireccion>()

  useEffect(()=>{
    console.log(direcciones)
    if (direcciones && raee.direccion){
      setDireccion(direcciones?.find(d => d.iddireccion === raee.direccion))
    }
  },[direcciones])
  return (
    <>
    <div className="rounded-xl bg-white border p-4 shadow">
      <div className="mt-2">
        <div className="w-full flex justify-between">
          <h3 className="text-xl font-bold">{raee.tipo_dispositivo}</h3>
          <p className="text-md text-gray-500">ID: {raee.id}</p>
        </div>

        <p className="text-slate-600 font-semibold">
          Estado: <span className="font-normal">{raee.estado_equipo}</span>
        </p>

        <p className="text-slate-600 font-semibold">
          Disposición: <span className="font-normal">{raee.tipo_disposicion}</span>
        </p>

        <p className="text-slate-600 font-semibold">
          Punto de entrega: <span className="font-normal">{raee.punto_entrega}</span>
        </p>

        {direccion &&
        <section>

          <p className="text-slate-600 font-semibold py-2">
            Dirección:
          </p>
            <Direccion direccion={direccion} modoVer={true}/>
        </section>
        }

        <p className="text-slate-600 font-semibold">
          Peso aprox: <span className="font-normal">{raee.peso_aproximado} kg</span>
        </p>
          
          {raee.comentarios &&
            <section className="border-t-2 py-2 my-2">
              <h4 className="text-lg font-bold">Comentarios</h4>
                <VisorTexto contenido={raee.comentarios}/>
            </section>
          }
      </div>

    </div>
    </>
  );
};

export default ItemRAEE;
