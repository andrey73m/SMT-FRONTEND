import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import socketService from "../../services/socketService";
import { CamposLogin, CamposCodigoVerificacion } from "../../components/formularios/validators";
import authService from "../../services/authService";
import { AxiosError } from "axios";
import tokenService from "../../services/tokenService";
import { manageAxiosThunk } from "../utils";

interface InfoSesion{
  idusuario: string,
  nombres: string,
  apellidos: string,
  email: string,
  rol?: string
}
interface EstadoSesion {
  info: InfoSesion,
  haySesion: boolean
}

const estadoInicial: EstadoSesion = {
  info:{
    idusuario: "",
    nombres: "",
    apellidos: "",
    email: "",
    rol: ""
  },
  haySesion: false
}

const inicializarInfoSesion = (state: EstadoSesion, token: string) => {
  const tokenPayload = tokenService.decodeToken(token)
  state.haySesion = !!tokenPayload;
  if (!tokenPayload){
    return;
  }
  socketService.socket.connect();
  const { apellidos, email,idusuario,nombres } = tokenPayload as InfoSesion
  state.info = { apellidos, email,idusuario,nombres }
}

export const sliceSesion = createSlice({
  name: "sesion",
  initialState: estadoInicial,
  reducers: {
    iniciarSesion: (state: EstadoSesion, action: PayloadAction<{token: string}>) => {
      inicializarInfoSesion(state,action.payload.token)
      tokenService.setToken(action.payload.token)
    },
    cargarSesion: (state: EstadoSesion) => {
      const token = tokenService.getToken()
      inicializarInfoSesion(state, token)
    },
    cerrarSesion: () => {
      tokenService.removeToken();
      socketService.socket.disconnect();
      return estadoInicial;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state: EstadoSesion, action: PayloadAction<{token: string}>) => {
      if (action.payload.token) sliceSesion.caseReducers.iniciarSesion(state, action)
    })
  }

})

export const { iniciarSesion, cargarSesion, cerrarSesion } = sliceSesion.actions



export const login = createAsyncThunk("sesion/login",async (credenciales: CamposLogin, ThunkAPI) => {
  return await manageAxiosThunk(() => authService.login(credenciales),ThunkAPI);
})
export const verificar = createAsyncThunk("sesion/login",async ({ codigo, idcodigo }: {codigo: CamposCodigoVerificacion, idcodigo: string}, ThunkAPI) => {
  return await manageAxiosThunk(() => authService.verificarCodigo(codigo, idcodigo),ThunkAPI);
})


export default sliceSesion.reducer;