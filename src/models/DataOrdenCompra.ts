import { DataProductoCompra } from "./DataProducto"



export interface ProductoOrden {
  idproducto: string
  cantidad: number
}

export interface OrdenCompra {
  idorden: string
  idusario: string
  iddireccion?: string
  estado: "pedido" | "enviado" | "recibido"
  costo_total: number
  costo_final: number
  fecha_orden: string
  productos: ProductoOrdenCompra[]
}

export interface ProductoOrdenCompra extends DataProductoCompra {
  costo: number
}

export interface OrdenCompraRequest {
  iddireccion?: string
  idcupon?: string
  productos: ProductoOrden[]
}