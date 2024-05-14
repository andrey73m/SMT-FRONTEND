export interface DataProducto{
  idproducto: string,
  idcomponente: string,
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
  idcat_espec: string
  atributo: string;
  valor: string
}