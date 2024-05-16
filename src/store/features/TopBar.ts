import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const estadoInicial = {
  visible: true,
  notificacion: {
    abierto: false,
    hayPendientes: false
  },
  menu:{
    abierto: false
  },
  botonesPerfil:{
    visible: false,
    toque: false,
    deslizado: false
  },
  carritoCompras:{
    abierto: false
  }
}

export const sliceTopBar = createSlice({
  name: "estado-topbar",
  initialState: estadoInicial,
  reducers:{
    setVisible: (state,action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
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
    setHayPendientes: (state, action: PayloadAction<boolean>) => {
      state.notificacion.hayPendientes = action.payload;
    },
    setToqueBotonPerfil: (state, action: PayloadAction<boolean>) => {
      state.botonesPerfil.toque = action.payload
    },
    setCarritoCompras: (state, action: PayloadAction<boolean>) => {
      state.carritoCompras.abierto = action.payload
    },
    resetTobBar: () => {
      return estadoInicial;
    }
  }
})

export const { abrirNotificaciones, cerrarNotificaciones, abrirMenu, cerrarMenu, setVisibleBotonPerfil, setToqueBotonPerfil, resetTobBar,setHayPendientes,setCarritoCompras,setVisible } = sliceTopBar.actions

export default sliceTopBar.reducer;