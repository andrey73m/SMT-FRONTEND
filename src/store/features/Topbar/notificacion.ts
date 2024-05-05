import { createSlice } from "@reduxjs/toolkit"

const estadoInicial = {
  abierto: false
}

export const sliceNotificaciones = createSlice({
  name: "boton-notificaciones",
  initialState: estadoInicial,
  reducers:{
    abrirNotificaciones: (state) => {
      state.abierto = true;
    },
    cerrarNotificaciones: (state) => {
      state.abierto = false;
    }
  }
})

export const { abrirNotificaciones, cerrarNotificaciones } = sliceNotificaciones.actions

export default sliceNotificaciones.reducer;