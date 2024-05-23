import { DataTicket } from "./DataTicket";

export interface DataConversacion{
  idconversacion: string;
  idticket: string;
  iddependiente: string;
  ticket: DataTicket
}

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