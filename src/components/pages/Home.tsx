import Servicios from "../views/servicios/Servicios";
 
const Home = () => {
  return (
    <div className="mt-12">
      <div className="flex flex-col p-6 gap-y-5">

        <div className="static h-96 flex justify-center backdrop-blur-sm items-center" style={{ backgroundImage: "url('https://th.bing.com/th/id/R.de8ec55fbc33031f48e013014052a5ea?rik=jlC%2butp28KZnlw&pid=ImgRaw&r=0')" }}>
          
          <h2 className="font-bold text-white text-5xl">¿Qué hacemos?</h2>
        </div>
        <Servicios/>
      </div>

    </div>
  );
}
 
export default Home;