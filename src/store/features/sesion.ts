import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { socketService } from "@/services/socketService";
import { CamposLogin, CamposCodigoVerificacion, CamposRegistro } from "@/components/formularios/validators";
import authService from "@/services/authService";
import tokenService from "@/services/tokenService";
import { manageAxiosThunk } from "../utils";

interface InfoSesion{
  idusuario: string,
  nombres: string,
  apellidos: string,
  email: string,
  nombreUsuario: string
}
interface EstadoSesion {
  info: InfoSesion;
  haySesion: boolean;
  cargando: boolean
}

const estadoInicial: EstadoSesion = {
  info:{
    idusuario: "",
    nombres: "",
    apellidos: "",
    email: "",
    nombreUsuario: ""
  },
  haySesion: false,
  cargando: false
}

const inicializarInfoSesion = (state: EstadoSesion, token: string) => {
  const tokenPayload = tokenService.decodeToken(token)
  state.haySesion = !!tokenPayload;
  if (!tokenPayload){
    return;
  }
  socketService.connect();
  const { apellidos, email,idusuario,nombres, nombreUsuario } = tokenPayload as InfoSesion
  state.info = { apellidos, email,idusuario,nombres, nombreUsuario }
}

export const sliceSesion = createSlice({
  name: "sesion",
  initialState: estadoInicial,
  reducers: {
    iniciarSesion: (state, action: PayloadAction<{token: string}>) => {
      inicializarInfoSesion(state,action.payload.token)
      tokenService.setToken(action.payload.token)
    },
    cerrarSesion: () => {
      tokenService.removeToken();
      socketService.disconnect();
      return estadoInicial;
    },
    detenerCarga: (state) => {
      state.cargando = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.cargando = true;
    })
    builder.addCase(login.rejected, (state) => {
      state.cargando = false;
    })
    builder.addCase(verificar.pending, (state) => {
      state.cargando = true;
    })
    builder.addCase(verificar.rejected, (state) => {
      state.cargando = false;
    })
    builder.addCase(verificar.fulfilled, (state) => {
      state.cargando = false;
    })
    builder.addCase(registro.pending, (state) => {
      state.cargando = true;
    })

    builder.addCase(login.fulfilled, (state, action: PayloadAction<{token: string}>) => {
      if (action.payload.token) sliceSesion.caseReducers.iniciarSesion(state, action)
      state.cargando = false;
    })
    builder.addCase(cargarSesion.rejected, (state) => {
      tokenService.removeToken();
      socketService.disconnect();
      state.haySesion = false;
      state.cargando = false;
      state.info = estadoInicial.info;
    })
    builder.addCase(cargarSesion.fulfilled, (state) => {
      const token = tokenService.getToken()
      state.cargando = false;
      inicializarInfoSesion(state, token)
    })
  }

})

export const { iniciarSesion, cerrarSesion, detenerCarga } = sliceSesion.actions



export const login = createAsyncThunk("sesion/login",async (credenciales: CamposLogin, ThunkAPI) => {
  return await manageAxiosThunk(() => authService.login(credenciales),ThunkAPI);
})
export const verificar = createAsyncThunk("sesion/verificar",async ({ codigo, idcodigo }: {codigo: CamposCodigoVerificacion, idcodigo: string}, ThunkAPI) => {
  return await manageAxiosThunk(() => authService.verificarCodigo(codigo, idcodigo),ThunkAPI);
})

export const registro = createAsyncThunk("sesion/registro",async (data: CamposRegistro, ThunkAPI) => {
  return await manageAxiosThunk(() => authService.registrar(data),ThunkAPI);
})

export const cargarSesion = createAsyncThunk("sesion/validar-token",async (_, ThunkAPI) => {
  const token = tokenService.getToken()
  if (!token) return;
  return await manageAxiosThunk(authService.validarSesion,ThunkAPI);
})


export default sliceSesion.reducer;