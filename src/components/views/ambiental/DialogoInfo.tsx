import { BotonPositivo } from "@/components/UI/Botones"
import DialogoMostrar, { tipoReferencia } from "@/components/UI/DialogoMostrar"
import { useRef } from "react"
import TextosInfoRAEE from "./TextosInfo"

const DialogoInfoRAEE = ()=>{
  const refDialogo = useRef<tipoReferencia>(null)
  
  return( 
    <>
      <DialogoMostrar ref={refDialogo}>
        <h2 className="text-3xl font-bold border-b-2 py-4">♻️ ¿Por qué participar?</h2>
        <TextosInfoRAEE messages={[
          "Los RAEE (Residuos de Aparatos Eléctricos y Electrónicos) son los equipos que ya no utilizas, que funcionan con corriente o baterías y que al final de su vida útil pueden generar un gran impacto ambiental si no se gestionan adecuadamente.",
          "Al reciclarlos o donarlos damos una segunda vida a sus componentes, recuperamos materiales valiosos y evitamos que sustancias peligrosas contaminen suelos y aguas.",
          "En Max TI queremos fomentar esa actitud responsable: tú entregas el equipo, nosotros nos encargamos del proceso sostenible."
        ]}/>
        <div className="py-3 grid grid-cols-2 gap-3">
        
        <p className="font-bold">¿Por qué es importante reciclarlo?</p> <p className="font-normal">Contaminación, recursos que se recuperan</p>
        <p className="font-bold">¿Cómo funciona el proceso?</p> <p className="font-normal">Tú entregas → nosotros gestionamos</p>
        <p className="font-bold">¿Qué puede hacer el usuario?</p> <p className="font-normal">Donar o reciclar</p>
        </div>
      </DialogoMostrar>
      <div>
        <BotonPositivo className=" underline rounded-none mt-4" simplificar={true}  negar={true} type="button" onClick={()=>refDialogo.current?.setMostrarDialogo(true)}>¿Por qué participar?</BotonPositivo>

      </div>
    </>
  )
}

export default DialogoInfoRAEE