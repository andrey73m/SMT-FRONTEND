export enum EstadosTicket{
  NUEVO = "nuevo",
  ACEPTADO = "aceptado",
  LISTO = "listo",
  EN_PROCESO = "en proceso",
  RESUELTO = "resuelto",
  CERRADO = "cerrado"
}

export interface DataUsuario{
  nombres: string;
  apellidos: string;
  email: string;
  nombre_usuario?: string
  idusuario: string;
}

export interface DataCalificacionTicket{
  valor: number;
  comentario?: string
}

export interface DataTicket{
  idticket: string;
  empleado_asignado: string;
  idtipo_servicio?: number;
  tipo_servicio?: string;
  asunto: string;
  email?: string
  contenido: string;
  estado: EstadosTicket;
  prioridad?: string;
  fecha_creacion:Date;
  usuario?: DataUsuario;
  empleado?: DataUsuario
  calificacion?: DataCalificacionTicket
}

