export interface DataProducto{
  idproducto: string,
  disponibilidad: number,
  marca: string,
  idcategoria: number,
  precio: number,
  precio_final: number,
  descuento?: number,
  nombre: string,
  descripcion: string,
  url_imagen: string
}

const productoOrdering = ["precio_final", "disponibilidad", "descuento"] as const;
export type TProductoOrdering = typeof productoOrdering;

export interface DataProductoCompra extends DataProducto{
  cantidad: number
}

export interface DataEspecificacionesProducto{
  idespec: string
  atributo: string;
  valor: string
}

export interface DataCategoria{
  idcategoria: number
  denominacion: number
}