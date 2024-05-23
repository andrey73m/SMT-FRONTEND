export default interface DataDireccion{
  iddireccion: string,
  idusuario: string,
  predeterminada: boolean,
  c_dane_departamento: string,
  c_dane_municipio: string,
  departamento?: string,
  municipio?:string,
  barrio: string,
  cadena_direccion: string
}