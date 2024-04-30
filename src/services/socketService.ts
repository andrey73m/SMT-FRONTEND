import Cookies from "universal-cookie"
import { env } from "../environment"
import { io, Socket } from "socket.io-client"

const cookies = new Cookies()

interface ServerEvents{
  notificacion: (notificacion: any) => void;
}

export const socket: Socket<ServerEvents, any> = io(`${env.BACKEND_ROOT}`,{
  extraHeaders:{},
  auth: (cb) => cb({ token: cookies.get("token") }),
  autoConnect: false
})




socket.on("connect", () => {
  socket.on("notificacion", (notificacion) => {
    console.log(notificacion)
  })
})

socket.on("disconnect", () => {
  console.log("Socket desconectado")
  socket.close()
  socket.removeAllListeners();
})

socket.on("connect_error",(e) => {
  console.log("Conexion rechazada",e)
})

