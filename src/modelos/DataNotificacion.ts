export default interface DataNotificacion{
  idnotificacion: string,
  idevento: number,
  idtipo: number,
  idusuario_iniciador: string,
  idusuario_notificado: string,
  rol_notificado: string[],
  idfuente: string,
  mensaje: string,
  fecha_creacion: Date,
  intervalo: string,
  visto?: boolean
}