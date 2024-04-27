import FormularioLogin from "./components/formularios/login"
import FormularioRegistrarse from "./components/formularios/registrarse"
import FormularioDireccion from "./components/formularios/direccion"
import FormularioComponente from "./components/formularios/componente"
import FormularioInventario from "./components/formularios/inventario"
const App = () => {
  
  return (
    <div className="w-screen h-screen bg-[#1E0132] text-white">
      <div className="w-full  h-full flex items-center justify-center">
        <FormularioRegistrarse/>
        <FormularioLogin/>
        <FormularioDireccion/>
        <FormularioComponente/>
        <FormularioInventario/>
      </div>
    </div>
  )
}

export default App
