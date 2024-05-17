import { env } from "@/environment"
import { io, Socket } from "socket.io-client"
import tokenService from "./tokenService";
import { DataMensajeEnviado, DataMensajeRecibido } from "@/models/Conversacion";


interface ServerEvents{
  notificacion: (notificacion: any) => void;
  "cambio-en-online": () => void;
  "chat:mensaje-nuevo": (mensaje: DataMensajeRecibido) => void;
  "nuevo-chat": () => void
}
interface ClientEvents {
  "chat:enviar-mensaje": (mensaje: DataMensajeEnviado, estado: (mensaje: DataMensajeRecibido)=>void) => void;
  
}

export const socketService: Socket<ServerEvents, ClientEvents> =  io(`${env.BACKEND_ROOT}`,{
  extraHeaders:{},
  auth: (cb) => cb({ token: tokenService.getToken() }),
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 5000
})

socketService.on("connect", () => {
  
  
  socketService.on("disconnect", () => {
    console.log("Socket desconectado")
    socketService.close()
    socketService.removeAllListeners();
  })

  socketService.on("connect_error",(e) => {
    console.log("Conexion rechazada",e)
  })
})


