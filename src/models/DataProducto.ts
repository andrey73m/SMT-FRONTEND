export interface DataProducto{
  idproducto: string,
  idproducto: string,
  sku: string,
  disponibilidad: number,
  precio: number,
  idcategoria: number,
  marca: string,
  nombre: string,
  descripcion: string,
  url_imagen: string
}

export interface DataEspecificacionesProducto{
  idespec: string
  atributo: string;
  valor: string
}