import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { jwtDecode } from "jwt-decode"
import Cookies from "universal-cookie"
const cookies = new Cookies();
interface InfoSesion{
  token: string,
  idusuario: string,
  nombres: string,
  apellidos: string,
  email: string,
  rol?: string
}
interface EstadoSesion {
  info: InfoSesion
}

const estadoInicial: EstadoSesion = {
  info:{
    token: "",
    idusuario: "",
    nombres: "",
    apellidos: "",
    email: "",
    rol: ""
  }
}

export const sliceSesion = createSlice({
  name: "sesion",
  initialState: estadoInicial,
  reducers: {
    iniciarSesion: (state: EstadoSesion, action: PayloadAction<string>) => {
      const tokenPayload = jwtDecode(action.payload)
      cookies.set("token", action.payload)
      const { apellidos, email,idusuario,nombres } = tokenPayload as InfoSesion
      console.log("iniciando sesion")
      state.info = { token: action.payload, apellidos, email,idusuario,nombres }
    },
    cargarSesion: (state: EstadoSesion) => {
      console.log("cargando sesion")
      const token = cookies.get("token")
      if (!token) return;
      const tokenPayload = jwtDecode(token)
      const { apellidos, email,idusuario,nombres } = tokenPayload as InfoSesion
      state.info = { token, apellidos, email,idusuario,nombres }
    }
  }
})

export const { iniciarSesion, cargarSesion } = sliceSesion.actions

export default sliceSesion.reducer;