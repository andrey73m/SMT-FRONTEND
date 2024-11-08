interface DataPromocion {
  asunto: string
  descripcion: string
  activo?: boolean
}



interface DefaultDataOferta extends DataPromocion{
  idoferta: string
  porcentaje: number
  fecha_inicio: string
  fecha_fin: string
}

interface DataOfertaCategoria extends DefaultDataOferta {
  idcategoria: number
  idproducto: never
}

interface DataOfertaProducto extends DefaultDataOferta {
  idcategoria: never
  idproducto: string
}

export type DataOferta = DataOfertaCategoria | DataOfertaProducto

const ofertaOrdering = ["fecha_inicio"]
export type TOfertaOrdering = typeof ofertaOrdering

interface DefaultDataCupon extends DataPromocion {
  idcupon: string
  duracion: number
  min_compras: number
  min_gastado: number
}

interface DataCuponPorcentaje extends DefaultDataCupon {
  porcentaje: number
  cantidad: never
}

interface DataCuponCantidad extends DefaultDataCupon {
  porcentaje: never
  cantidad: number
}

export type DataCupon = DataCuponPorcentaje | DataCuponCantidad
