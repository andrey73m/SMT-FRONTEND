export default interface DataTicket{
  idticket: string;
  empleado_asignado: string;
  idtipo_servicio: number;
  asunto: string;
  contenido: string;
  estado: string;
  prioridad: string;
  fecha_creacion:Date
}