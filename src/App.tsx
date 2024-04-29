import FormularioLogin from "./components/formularios/login"
import FormularioRegistrarse from "./components/formularios/registrarse"
import FormularioDireccion from "./components/formularios/direccion"
import FormularioComponente from "./components/formularios/componente"
import FormularioInventario from "./components/formularios/inventario"
import FormularioCodigoVerificacion from "./components/formularios/codigo_verificacion"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import EditorTexto from "./components/UI/EditorTexto"
import FormularioTicket from "./components/formularios/ticket"

const App = () => {
  
  return (
    <>

      <Router>
        <Routes>
          <Route path="/registrarse" element={<FormularioRegistrarse />}/>
          <Route path="/login" element={<FormularioLogin/>}/>
          <Route path="/verificacion/:idcodigo" element={<FormularioCodigoVerificacion/>}/>
          <Route path="/direcciones" element={<FormularioDireccion />} />
          <Route path="/catalogo" element={<FormularioComponente />} />
          <Route path="/inventario" element={<FormularioInventario />} />
        </Routes>
      </Router>
        
      {/* <FormularioTicket/> */}
    </>
  )
}

export default App
