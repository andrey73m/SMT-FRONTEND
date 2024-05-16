import { env } from "@/environment"
import { io, Socket } from "socket.io-client"
import tokenService from "./tokenService";


interface ServerEvents{
  notificacion: (notificacion: any) => void;
  "cambio-en-online": () => void;
}

export const socketService: Socket<ServerEvents, any> =  io(`${env.BACKEND_ROOT}`,{
  extraHeaders:{},
  auth: (cb) => cb({ token: tokenService.getToken() }),
  autoConnect: false
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


