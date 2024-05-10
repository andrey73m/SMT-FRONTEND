import Productos from "../views/inventario/vistaProductos";

const Inventario = () => {
  return (
    <>
      <div
        className="bg-cover  bg-fixed h-96 flex  backdrop-blur-sm  bg-center"
        style={{ backgroundImage: "url('https://estaticos.elcolombiano.com/documents/10157/0/580x365/0c0/0d0/none/11101/DNMT/image_content_31335055_20180629185454.jpg')" }}
      >
        <div className="flex backdrop-blur-sm w-full h-full bg-black/50 justify-center items-center">
          <h2 className="font-bold text-center text-white text-7xl sm:text-8xl top-0 sticky">Nuestros productos</h2>
        </div>
      </div>
      
      <div className="min-h-screen py-6 px-10 lg:grid grid-cols-3 gap-6">
        <Productos />
      </div>
    </>
  );
}
 
export default Inventario;