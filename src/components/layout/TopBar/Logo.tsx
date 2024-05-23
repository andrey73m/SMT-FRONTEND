import LogoPrincipal from "@/components/icons/LogoPrincipal";
import { useNavigate } from "react-router-dom";

 
const LogoTopBar = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-nowrap transition-all text-white items-center bg-purple-950 gap-x-3 pr-3 cursor-pointer" onClick={() => navigate("/")}>
      <div className="flex transition-all h-full justify-center bg-purple-900">
        <LogoPrincipal />
      </div>
      <h2 className="font-bold text-2xl transition-all hidden md:block font-poetsen">Support Max TI</h2>
    </div>
  );
}
 
export default LogoTopBar;