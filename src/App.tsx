import FormularioLogin from "@/components/formularios/login"
import FormularioRegistrarse from "@/components/formularios/registrarse"
import FormularioDireccion from "@/components/formularios/direccion"
import FormularioComponente from "@/components/formularios/componente"
import FormularioInventario from "@/components/formularios/inventario"
import FormularioCodigoVerificacion from "@/components/formularios/codigo_verificacion"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import { useAppDispatch } from "@/store"
import { cargarSesion } from "@/store/features/sesion"
import TopBar from "@/components/layout/TopBar"
import { Guardian, TituloPagina } from "@/components/wrappers"
import FormularioServicio from "@/components/formularios/servicio"
import Home from "@/components/pages/Home"
import { useQueryClient } from "@tanstack/react-query"
import AboutUs from "./components/pages/informacion"
import PaginaProductos from "./components/pages/Productos"

import PaginaTickets from "./components/pages/Tickets"
import PaginaDetallesProducto from "./components/pages/DetallesProducto"
import PaginConversacion from "./components/pages/Conversacion"
import PaginaConversaciones from "./components/pages/Conversaciones"
const App = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  useEffect(() => {
    dispatch(cargarSesion())
    queryClient.refetchQueries({ queryKey: ["rol-usuario"] })
  },[])
  return (
    <>
      
      <Router>
        
        <Routes>
          <Route path="/registro" element={
            <TituloPagina titulo="Registro">
              <FormularioRegistrarse />
            </TituloPagina>
          }/>
          <Route path="/login" element={
            <TituloPagina titulo="Inicio de sesión">
              <FormularioLogin/>
            </TituloPagina>
          }/>
          <Route path="verificacion/:idcodigo" element={
            <TituloPagina titulo="Código de verificación">
              <FormularioCodigoVerificacion/>
            </TituloPagina>
          }/>
          <Route path="/" element={<TopBar/>}>
            <Route path="/" element={
              <TituloPagina titulo="Página Inicio">
                <Home/>
              </TituloPagina>
            }/>

            <Route path="tickets" element={
              <Guardian>
                <TituloPagina titulo="Tickets">
                  <PaginaTickets />
                </TituloPagina>
              </Guardian>
            } >
            </Route>
            <Route path="tickets/:idticket" element={
              <Guardian>
                <TituloPagina titulo="Detalles ticket">
                  <PaginaTickets key="1" />
                </TituloPagina>
              </Guardian>
            }>
            </Route>
            <Route path="direcciones" element={<FormularioDireccion />} />
            <Route path="chats" element={
              <Guardian>
                <TituloPagina titulo="Conversaciones">
                  <PaginaConversaciones/>
                </TituloPagina>
              </Guardian>
            }>
              <Route path=":idchat" element={
                <TituloPagina titulo="Conversacion: ">
                  <PaginConversacion />
                </TituloPagina>
              } />
            </Route>
            
            <Route path="crear-servicio" element={<FormularioServicio/>}/>
            <Route path="catalogo" element={<FormularioComponente />} />
            <Route path="quienes-somos" element={<AboutUs/>} />
            <Route path="productos" element={<PaginaProductos/>}/>
            <Route path="productos/:idproducto" element={
              <TituloPagina titulo="Detalles: ">
                <PaginaDetallesProducto />
              </TituloPagina>
            } />
            <Route path="crear-producto" element={<FormularioInventario/>}/>
          </Route>
          
        </Routes>
      </Router>
      
    </>
  )
}

export default App
