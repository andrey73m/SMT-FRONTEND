export interface DataMensajeEnviado{
  idticket: string
  contenido: string;
  fecha_envio: Date;
}

export interface DataMensajeRecibido extends DataMensajeEnviado{
  idmensaje: string;
  idemisor: string;
  estado: string;
}