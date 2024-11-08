import { SpinnerPagina } from "@/components/UI";
import { useQueryCupones } from "@/hooks";
import Cupon from "./cupon";

interface CuponesProps {
  modoCompra?: boolean
  afterSelect: () => void
}

const Cupones = ({ afterSelect, modoCompra }: CuponesProps) => {
  const cuponesQuery = useQueryCupones()
  if (cuponesQuery.isLoading) return <SpinnerPagina />
  
  return (

    <>
      {
        cuponesQuery.data &&
        <>{
          cuponesQuery.data.length > 0 ?
            cuponesQuery.data?.map((cupon) =>
              <div className="p-3" key={cupon.idcupon}>
                <Cupon cupon={cupon} afterSelect={afterSelect} modoCompra={modoCompra}/>
              </div>
            )
            :
            <p className="font-bold text-center p-4 text-lg text-slate-400">Parece que no hay cupones</p>}
        </>
      }
    </>
  );

}

export default Cupones;