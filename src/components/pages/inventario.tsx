import Productos from "../views/inventario/vistaProductos";

const Inventario = () => {
  return (
    <>
      <div
        className="bg-cover  bg-fixed h-96 flex  backdrop-blur-sm  bg-center"
        style={{ backgroundImage: "url('https://th.bing.com/th/id/R.de8ec55fbc33031f48e013014052a5ea?rik=jlC%2butp28KZnlw&pid=ImgRaw&r=0')" }}
      >
        <div className="flex backdrop-blur-sm w-full h-full bg-black/50 justify-center items-center">
          <h2 className="font-bold text-center text-white text-7xl sm:text-8xl top-0 sticky">Nuestros productos</h2>
        </div>
      </div>
      
      <div className="flex h-full flex-col py-6 px-10 gap-y-5 ">
        <Productos />
      </div>
    </>
  );
}
 
export default Inventario;