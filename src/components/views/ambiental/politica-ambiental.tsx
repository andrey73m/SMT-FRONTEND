import { BotonPositivo } from "@/components/UI/Botones"
import DialogoMostrar, { tipoReferencia } from "@/components/UI/DialogoMostrar"
import { useRef } from "react"

const DialogoPoliticaAmbiental = ()=>{
  const refDialogo = useRef<tipoReferencia>(null)
  
  return( 
    <>
      <DialogoMostrar ref={refDialogo}>
        <section>
          <h2 className="text-3xl font-bold border-b-2 py-4">🌎 Nuestra Política Ambiental</h2>
          <div className="flex flex-col gap-y-4 text-xl p-5">

          <p>En Support Max TI S.A.S. estamos comprometidos con el cuidado del medio ambiente y la gestión responsable de los residuos tecnológicos.</p>
          <p>Promovemos prácticas sostenibles en la venta, reparación y disposición final de equipos informáticos, fomentando entre nuestros clientes y colaboradores la correcta entrega de residuos de aparatos eléctricos y electrónicos (RAEE).</p>
          <p>Nuestra meta es reducir el impacto ambiental asociado a la tecnología, impulsar la economía circular y contribuir a un futuro más verde a través de soluciones digitales y campañas de sensibilización.</p>
          <p className="italic border-t-2 py-4">"Porque reparar tecnología también puede significar reparar el planeta".</p>
          </div>
        </section>
      </DialogoMostrar>
      <div>
        <BotonPositivo className="rounded-none underline text-xl" type="button" negar={true} simplificar={true} onClick={()=>refDialogo.current?.setMostrarDialogo(true)}>
          Conoce nuestra política ambiental
        </BotonPositivo>
      </div>
    </>
  )
}

export default DialogoPoliticaAmbiental