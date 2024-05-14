export enum EstadosTicket{
  NUEVO = "nuevo",
  ACEPTADO = "aceptado",
  LISTO = "listo",
  EN_PROCESO = "en proceso",
  RESUELTO = "resuelto",
  CERRADO = "cerrado"
}

export interface UsuarioTicket{
  nombres: string;
  apellidos: string;
  email: string;
  idusuario: string;
}

export interface DataTicket{
  idticket: string;
  empleado_asignado: string;
  idtipo_servicio: number;
  asunto: string;
  email?: string
  contenido: string;
  estado: EstadosTicket;
  prioridad: string;
  fecha_creacion:Date;
  usuario?: UsuarioTicket;
  empleado?: UsuarioTicket
}

