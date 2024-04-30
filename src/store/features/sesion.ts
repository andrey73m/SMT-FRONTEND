import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { socket } from "../../services/socketService";
import { CamposLogin } from "../../components/formularios/validators";
import authService from "../../services/authService";
import { AxiosError } from "axios";
import tokenService from "../../services/tokenService";

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
  socket.connect();
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state: EstadoSesion, action: PayloadAction<{token: string}>) => {
      if (action.payload.token) sliceSesion.caseReducers.iniciarSesion(state, action)
    })
  }

})

export const { iniciarSesion, cargarSesion } = sliceSesion.actions

export const login = createAsyncThunk("sesion/login",async (credenciales: CamposLogin, { rejectWithValue }) => {
  try {
    const res = await authService.login(credenciales);
    return res
  }catch (e) {
    const err = e as AxiosError
    if (!err.response) {

      return rejectWithValue({ error: err.code })
    }
    const message = (err.response.data as any).error
    return rejectWithValue({ error: { status: err.response.status,message } })
  }
})

export default sliceSesion.reducer;