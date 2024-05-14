import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ListaTickets from "../views/tickets/ListaTickets";

 
const PaginaTickets = () => {
  const [params] = useSearchParams()
  const { search } = useLocation()
  const { idticket } = useParams()
  console.log("Params", params)
  return (
    <>
      <h2 className="text-4xl font-bold text-center my-2">
        Tickets
      </h2>
      <ListaTickets idticket={idticket} params={params} key={search}/>
    </>
  );
}
 
export default PaginaTickets;