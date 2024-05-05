import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { sliceSesion } from "./features/sesion";
import { sliceNotificaciones } from "./features/Topbar/notificacion";


export const store = configureStore({
  reducer: {
    sesion: sliceSesion.reducer,
    notificaciones: sliceNotificaciones.reducer
  }
})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;