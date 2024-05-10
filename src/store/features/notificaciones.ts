import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface DataNotificacion{
  idnotificacion: string,
  idevento: number,
  idtipo: number,
  idusuario_iniciador: string,
  idusuario_notificado: string,
  rol_notificado: string,
  idfuente: string,
  mensaje: string,
  vista?: boolean
}

const estadoInicial: DataNotificacion[] = []

export const sliceNotificaciones = createSlice({
  name: "notificaciones",
  initialState: estadoInicial,
  reducers: {
    agregarNotificacion: (state: DataNotificacion[], action: PayloadAction<DataNotificacion>) => {
      state.push(action.payload)
    },
    notificacionVista: (state: DataNotificacion[], action: PayloadAction<string>) => {
      return state.map(notificacion => {
        if (notificacion.idnotificacion === action.payload){
          notificacion = { ...notificacion, vista: true }
        }
        return notificacion
      })
    }
  }
})

export const { agregarNotificacion, notificacionVista } = sliceNotificaciones.actions

export default sliceNotificaciones.reducer
