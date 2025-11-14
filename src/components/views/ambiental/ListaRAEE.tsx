import { isAxiosError } from "axios";
import { SpinnerPagina } from "@/components/UI";
import ItemRAEE from "./ItemRAEE";
import { RegistroRAEE } from "@/services/RAEEService";
import { useQueryRegistrosRAEE } from "@/hooks/raee";
import { useQueryDirecciones, useSesion } from "@/hooks";

const ListaRAEE = () => {
  const {info: {idusuario}} = useSesion()
  const direcciones = useQueryDirecciones(idusuario)
  const registrosQuery = useQueryRegistrosRAEE();

  if (registrosQuery.isLoading) return <SpinnerPagina />;

  if (registrosQuery.isError) {
    if (isAxiosError(registrosQuery.error)) {
      if (registrosQuery.error.response?.status === 400){}
        // navigate("/raee");
    }
  }
  return (
    <>
      {registrosQuery.data && (
        <>
          {registrosQuery.data.length > 0 ? (
            registrosQuery.data.map((raee: RegistroRAEE) => (
              <div className="p-3" key={raee.id}>
                <ItemRAEE
                  raee={raee}
                  direcciones={direcciones.data || []}
                />
              </div>
            ))
          ) : (
            <p className="font-bold text-center p-4 text-lg text-slate-400">
              Parece que aún no has registrado ningún RAEE.
            </p>
          )}
        </>
      )}
    </>
  );
};

export default ListaRAEE;
