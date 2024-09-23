export interface DataProducto{
  idproducto: string,
  disponibilidad: number,
  marca: string,
  idcategoria: number,
  precio: number,
  nombre: string,
  descripcion: string,
  url_imagen: string
}

export interface DataEspecificacionesProducto{
  idespec: string
  atributo: string;
  valor: string
}