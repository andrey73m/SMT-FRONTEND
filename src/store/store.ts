import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { sliceSesion } from "./features/sesion";
import { sliceTopBar } from "./features/TopBar";


export const store = configureStore({
  reducer: {
    sesion: sliceSesion.reducer,
    topBar: sliceTopBar.reducer
  }
})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;