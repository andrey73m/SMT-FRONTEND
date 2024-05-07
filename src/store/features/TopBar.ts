import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const estadoInicial = {
  notificacion: {
    abierto: false
  },
  menu:{
    abierto: false
  },
  botonesPerfil:{
    visible: false,
    toque: false,
    deslizado: false
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
    },
    setVisibleBotonPerfil: (state, action: PayloadAction<boolean>) => {
      if (action.payload) state.botonesPerfil.deslizado = true
      state.botonesPerfil.visible = action.payload;
    },
    setToqueBotonPerfil: (state, action: PayloadAction<boolean>) => {
      state.botonesPerfil.toque = action.payload
    },
    resetTobBar: () => {
      return estadoInicial;
    }
  }
})

export const { abrirNotificaciones, cerrarNotificaciones, abrirMenu, cerrarMenu, setVisibleBotonPerfil, setToqueBotonPerfil, resetTobBar } = sliceTopBar.actions

export default sliceTopBar.reducer;