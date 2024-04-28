import FormularioLogin from "./components/formularios/login"
import FormularioRegistrarse from "./components/formularios/registrarse"
import FormularioDireccion from "./components/formularios/direccion"
import FormularioComponente from "./components/formularios/componente"
import FormularioInventario from "./components/formularios/inventario"
import FormularioCodigoVerificacion from "./components/formularios/codigo_verificacion"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
const App = () => {
  
  return (
    <div className="w-screen h-screen bg-[#1E0132] text-white">
      <div className="w-full  h-full flex items-center justify-center">

        <Router>
          <Routes>
            <Route path="/registrarse" element={<FormularioRegistrarse />}/>
            <Route path="/login" element={<FormularioLogin/>}/>
            <Route path ="/direcciones" element ={<FormularioDireccion/>}/>
            <Route path="/catalogo" element={<FormularioComponente/>}/>
            <Route path="/inventario" element={<FormularioInventario/>}/>
            <Route path="/verificacion/:idcodigo" element={<FormularioCodigoVerificacion/>}/>
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
