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
  estado: string;
  prioridad: string;
  fecha_creacion:Date;
  usuario: UsuarioTicket;
}

