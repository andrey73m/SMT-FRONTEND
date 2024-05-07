import { Link } from "react-router-dom";
import Servicios from "../views/servicios/Servicios";
import VistaRol from "../wrappers/VistaRol";
 
const Home = () => {
  return (
    <>
      <div
        className="bg-cover  bg-fixed h-96 flex  backdrop-blur-sm  bg-center"
        style={{ backgroundImage: "url('https://th.bing.com/th/id/R.de8ec55fbc33031f48e013014052a5ea?rik=jlC%2butp28KZnlw&pid=ImgRaw&r=0')" }}
      >
        <div className="flex backdrop-blur-sm w-full h-full bg-black/50 justify-center items-center">
          <h2 className="font-bold text-center text-white text-7xl sm:text-8xl top-0 sticky">Nuestros servicios</h2>
        </div>
      </div>
      <VistaRol roles={["cliente"]} permitirSinAutenticar>

        <Link to="/crear-ticket" className="sticky top-12">
          <div className="bg-violet-700 hover:bg-violet-500 text-center text-white p-4 font-bold ">Si tienes problemas, ¡Mándanos un ticket!</div>
        </Link>
      </VistaRol>
      <div className="flex h-full flex-col py-6 px-10 gap-y-5 ">
        <Servicios />
      </div>
    </>
  );
}
 
export default Home;