import { useQueryRegistrosRAEE } from "@/hooks/raee";
import FormularioRAEE from "../formularios/raee";
import AlternarFormularioSticky from "../layout/AlternarFormularioSticky";
import { ImagenTitulo } from "../layout/FormatoImagenes";
import { BotonPositivo } from "../UI/Botones";
import ListaRAEE from "../views/ambiental/ListaRAEE";

const PaginaRAEE = () => {
  const {data} = useQueryRegistrosRAEE()
  const cantidad = data?.length;
  return(
    <>
      <ImagenTitulo titulo="Disposición de RAEE" urlImagen="https://ecocomputo.com/wp-content/uploads/2025/09/que-hacer-con-los-raee-en-colombia-banda-transporte-operarios.jpg"/>
      <AlternarFormularioSticky texto="¿Tienes aparatos eléctricos o electrónicos viejos y no sabes como desecharlos correctamente?" Formulario={FormularioRAEE} Boton={BotonPositivo}/>
      <section className="flex flex-col items-center my-2 text-2xl border-t-2 py-4 border-b-2">

      <p className="">¡Forma parte!, ya se han registrado <span className="font-bold bg-green-500 px-3 py-1  rounded-full text-white">{cantidad}</span> dipositivos</p>
      <BotonPositivo className=" underline rounded-none mt-4" simplificar={true}  negar={true}>¿Por qué participar?</BotonPositivo>
      </section>
      <ListaRAEE/>
    </>
  )
}

export default PaginaRAEE;