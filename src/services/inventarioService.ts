import axios from "axios"
import { env } from "../environment"
import tokenService from "./tokenService"
import { CamposProducto } from "../components/formularios/validators"
import { PaginationOptions, PaginationResponse } from "@/models/Paginacion"
import { DataProducto, TProductoOrdering } from "@/models/DataProducto"

export default {
  crearProducto: async (data: CamposProducto) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.post(`${env.BACKEND_ROOT}/productos/inventario/${data.idproducto}`,data, { headers: auth })
    return res.data;
  },
  actualizarProducto: async (data:CamposProducto, idproducto?:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.put(`${env.BACKEND_ROOT}/productos/inventario/${idproducto}`,data, { headers: auth })
    return res.data;
  },
  eliminarProducto: async (idproducto?:string) => {
    const auth = tokenService.getAuthHeader()
    const res = await axios.delete(`${env.BACKEND_ROOT}/productos/inventario/${idproducto}`, { headers: auth })
    return res.data;
  },
  obtenerProductos: async (nextParam: PaginationOptions<TProductoOrdering>): Promise<PaginationResponse<DataProducto>> => {

    const res = await axios.get(`${env.BACKEND_ROOT}/productos/inventario`, {
      headers: {
        pagination: JSON.stringify(nextParam)
      }
    })
    return res.data;
  },
  obtenerProducto: async (idproducto: string) => {
    const res = await axios.get(`${env.BACKEND_ROOT}/productos/inventario/${idproducto}`)
    return res.data;
  },
  obtenerEspecificacionesProducto: async (idproducto: string) => {
    const res = await axios.get(`${env.BACKEND_ROOT}/productos/especificaciones-producto/${idproducto}`)
    return res.data;
  },
  obtenerCategorias: async () => {
    const res = await axios.get(`${env.BACKEND_ROOT}/productos/categorias`)
    return res.data;
  },
  obtenerCategoria: async (idcategoria: number) => {
    const res = await axios.get(`${env.BACKEND_ROOT}/productos/categorias/${idcategoria}`)
    return res.data;
  },
}