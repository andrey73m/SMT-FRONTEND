import { createSlice } from "@reduxjs/toolkit"

const estadoInicial = {
  notificacion: {
    abierto: false
  },
  menu:{
    abierto: false
  }
}

export const sliceTopBar = createSlice({
  name: "estado-topbar",
  initialState: estadoInicial,
  reducers:{
    abrirNotificaciones: (state) => {
      state.notificacion.abierto = true;
    },
    cerrarNotificaciones: (state) => {
      state.notificacion.abierto = false;
    },
    abrirMenu: (state) => {
      state.menu.abierto = true;
    },
    cerrarMenu: (state) => {
      state.menu.abierto = false;
    }
  }
})

export const { abrirNotificaciones, cerrarNotificaciones, abrirMenu, cerrarMenu } = sliceTopBar.actions

export default sliceTopBar.reducer;