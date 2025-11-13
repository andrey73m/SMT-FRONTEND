import FormularioLogin from "@/components/formularios/login"
import FormularioRegistrarse from "@/components/formularios/registrarse"
import FormularioProducto from "@/components/formularios/producto"
import FormularioCodigoVerificacion from "@/components/formularios/codigo_verificacion"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAppDispatch } from "@/store"
import { cargarSesion } from "@/store/features/sesion"
import TopBar from "@/components/layout/TopBar"
import { Guardian, TituloPagina } from "@/components/wrappers"
import Home from "@/components/pages/Home"
import { useQueryClient } from "@tanstack/react-query"
import AboutUs from "./components/pages/informacion"
import PaginaProductos from "./components/pages/Productos"
import PaginaTickets from "./components/pages/Tickets"
import PaginaDetallesProducto from "./components/pages/DetallesProducto"
import PaginaDirecciones from "./components/pages/Direcciones"
import PaginaConversacion from "./components/pages/Conversacion"
import PaginaConversaciones from "./components/pages/Conversaciones"
import PaginaOfertas from "./components/pages/GestionarOfertas"
import PaginaCompraProductos from "./components/pages/CompraProductos"

import { App as CapacitorApp } from "@capacitor/app"
import PaginaMisCompras from "./components/pages/MisCompras"
import PaginaRAEE from "./components/pages/Recicla"

const App = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(cargarSesion())
    queryClient.refetchQueries({ queryKey: ["rol-usuario"] })

    CapacitorApp.addListener("backButton", (e) => {
      if (e.canGoBack) return navigate(-1)
      
      CapacitorApp.exitApp()
    })

    return () => {
      CapacitorApp.removeAllListeners()
    }
  },[])
  return (
    <>
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


          <Route path="direcciones" element={
            <Guardian roles={["admin", "cliente"]}>
              <TituloPagina titulo="Direcciones">
                <PaginaDirecciones/>
              </TituloPagina>
            </Guardian>
          }/>


          <Route path="direcciones" element={
            <Guardian roles={["admin"]} alt="/direcciones">
              <TituloPagina titulo="Direcciones usuario">
                <PaginaDirecciones />
              </TituloPagina>
            </Guardian>
          } />
          <Route path="recicla-con-nosotros" element={
            <Guardian roles={["cliente"]} alt="/recicla-con-nosotros">
              <TituloPagina titulo="Support Max TI - Sostenible">
                <PaginaRAEE />
              </TituloPagina>
            </Guardian>
          } />
          <Route path="promociones">
            <Route path="ofertas" element={
              <Guardian roles={["admin"]} alt="/promociones/ofertas">
                <TituloPagina titulo="Nueva oferta">
                  <PaginaOfertas />
                </TituloPagina>
              </Guardian>
            } />
          </Route>

          <Route path="chats" element={
            <Guardian>
              <TituloPagina titulo="Conversaciones">
                <PaginaConversaciones/>
              </TituloPagina>
            </Guardian>
          }>
            <Route path=":idticket" element={
              <TituloPagina titulo="Conversacion: ">
                <PaginaConversacion />
              </TituloPagina>
            } />
          </Route>

            
          <Route path="productos" element={
            <TituloPagina titulo="Productos">
              <PaginaProductos/>
            </TituloPagina>
          }>
          </Route>

            
          <Route path="productos/:idproducto" element={
            <TituloPagina titulo="Detalles: ">
              <PaginaDetallesProducto />
            </TituloPagina>
          } />

          <Route path="carrito/comprando/:idproducto?" element={
            <Guardian>
              <TituloPagina titulo="Orden">
                <PaginaCompraProductos/>
              </TituloPagina>
            </Guardian>
          }
          />
          <Route path="mis_compras" element={
            <Guardian roles={["cliente"]} alt="/mis_compras">
              <TituloPagina titulo="Mis compras">
                <PaginaMisCompras/>
              </TituloPagina>
            </Guardian>
          }
          />
                        
          <Route path="quienes-somos" element={
            <TituloPagina titulo="Nosotros">
              <AboutUs/>
            </TituloPagina>
          }/>
            
        </Route>

        <Route path="catalogo" element={<FormularioProducto />} />
          
      </Routes>
    </>
  )
}

export default App
