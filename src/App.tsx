import FormularioLogin from "./components/formularios/login"
import FormularioRegistrarse from "./components/formularios/registrarse"
import FormularioDireccion from "./components/formularios/direccion"
import FormularioComponente from "./components/formularios/componente"
import FormularioInventario from "./components/formularios/inventario"
import FormularioCodigoVerificacion from "./components/formularios/codigo_verificacion"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import FormularioTicket from "./components/formularios/ticket"
import { useEffect } from "react"
import { useAppDispatch } from "./store"
import { cargarSesion } from "./store/features/sesion"
import TopBar from "./components/layout/TopBar"
import MenuBar from "./components/layout/MenuBar"
const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(cargarSesion())
  },[])
  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/registro" element={<FormularioRegistrarse />}/>
          <Route path="/login" element={<FormularioLogin/>}/>
          <Route path="/" element={<TopBar/>}/>
          <Route path="/prueba" element={<MenuBar/>}>
            <Route path="verificacion/:idcodigo" element={<FormularioCodigoVerificacion/>}/>
            <Route path="crear-ticket" element={<FormularioTicket />} />
            <Route path="direcciones" element={<FormularioDireccion />} />
            <Route path="catalogo" element={<FormularioComponente />} />
            <Route path="inventario" element={<FormularioInventario />} />
          </Route>
        </Routes>
      </Router>
        
      
    </>
  )
}

export default App
