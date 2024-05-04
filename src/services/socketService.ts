import { env } from "../environment"
import { io, Socket } from "socket.io-client"
import tokenService from "./tokenService";


interface ServerEvents{
  notificacion: (notificacion: any) => void;
}

const socket: Socket<ServerEvents, any> =  io(`${env.BACKEND_ROOT}`,{
  extraHeaders:{},
  auth: (cb) => cb({ token: tokenService.getToken() }),
  autoConnect: false
})

export default socket

socket.on("connect", () => {
  
  
  socket.on("disconnect", () => {
    console.log("Socket desconectado")
    socket.close()
    socket.removeAllListeners();
  })

  socket.on("connect_error",(e) => {
    console.log("Conexion rechazada",e)
  })
})


