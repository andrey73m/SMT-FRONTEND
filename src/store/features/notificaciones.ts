import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import timeService from "../../services/timeService"
import { manageAxiosThunk } from "../utils"
import notificationService from "../../services/notificationService"

export interface DataNotificacion{
  idnotificacion: string,
  idevento: number,
  idtipo: number,
  idusuario_iniciador: string,
  idusuario_notificado: string,
  rol_notificado: string[],
  idfuente: string,
  mensaje: string,
  fecha_creacion: Date,
  intervalo: string,
  visto?: boolean
}



interface EstadoNotificaciones {
  data: DataNotificacion[];
  cargando?: boolean;
}
const estadoInicial: EstadoNotificaciones = {
  data: [],
  cargando: false
}

export const sliceNotificaciones = createSlice({
  name: "notificaciones",
  initialState: estadoInicial,
  reducers: {
    agregarNotificacion: (state: EstadoNotificaciones, action: PayloadAction<DataNotificacion>) => {
      action.payload.intervalo = timeService.convertirFechaEnIntervalo(action.payload.fecha_creacion);
      state.data.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(obtenerNotificaciones.pending, (state: EstadoNotificaciones) => {
      state.cargando = true;
    })
    builder.addCase(obtenerNotificaciones.fulfilled, (state: EstadoNotificaciones, action: PayloadAction<DataNotificacion[]>) => {
      state.cargando = false;
      state.data = action.payload.map(notificacion => {
        notificacion.intervalo = timeService.convertirFechaEnIntervalo(notificacion.fecha_creacion);
        return notificacion
      });
    })
    builder.addCase(marcarNotificacionVista.fulfilled, (state: EstadoNotificaciones, action: PayloadAction<DataNotificacion>) => {
      action.payload.intervalo = timeService.convertirFechaEnIntervalo(action.payload.fecha_creacion);
      state.data = state.data.map(notificacion =>
        notificacion.idnotificacion === action.payload.idnotificacion ?
          action.payload : notificacion
      )
    })
  }
})

export const { agregarNotificacion } = sliceNotificaciones.actions

export const obtenerNotificaciones = createAsyncThunk("obtener-notificaciones",async (_, ThunkAPI) => {
  return await manageAxiosThunk(() => notificationService.getNotifications(),ThunkAPI);
})

export const marcarNotificacionVista = createAsyncThunk("marcar-notificacion-vista",async (idnotificacion: string, ThunkAPI) => {
  return await manageAxiosThunk(() => notificationService.setNotificationView(idnotificacion),ThunkAPI);
})

export default sliceNotificaciones.reducer
