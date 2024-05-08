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
import VisorTexto from "./components/UI/VisorTexto"
import VistaTicket from "./components/views/tickets/VistaTicket"
import Guardian from "./components/wrappers/Guardian"
import FormularioServicio from "./components/formularios/servicio"
import Home from "./components/pages/Home"
import AboutUs from "./components/pages/informacion"

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
          <Route path="verificacion/:idcodigo" element={<FormularioCodigoVerificacion/>}/>
          <Route path="/" element={<TopBar/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="crear-ticket" element={
              <Guardian roles={["cliente"]} permitirSinAutenticar>
                <FormularioTicket />
              </Guardian>
            } />
            <Route path="tickets" element={<VisorTexto/>} />
            <Route path="tickets/:idticket" element={
              <Guardian>
                <VistaTicket />
              </Guardian>
            } />
            <Route path="direcciones" element={<FormularioDireccion />} />
            <Route path="crear-servicio" element={<FormularioServicio/>}/>
            <Route path="catalogo" element={<FormularioComponente />} />
            <Route path="quienes-somos" element={<AboutUs/>} />
            <Route path="crear-producto" element={<FormularioInventario/>}/>
            <Route path="inventario" element={<FormularioInventario />} />
          </Route>
          
        </Routes>
      </Router>
        
      
    </>
  )
}

export default App
