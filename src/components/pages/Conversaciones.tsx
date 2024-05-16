import { Outlet } from "react-router-dom";

interface PaginaConversacionesProps {
  
}
 
const PaginaConversaciones = () => {
  return (
    <div className="sm:flex min-h-0 h-[calc(100vh-3rem)] w-full">
      <div className="sm:w-72 lg:w-96 h-full overflow-y-auto *:py-10">
        
      </div>
      <div className="sm:grow h-full">
        <Outlet/>
      </div>
    </div>
  );
}
 
export default PaginaConversaciones;