import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie"
import { getRol } from "../services/auth";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { cargarSesion } from "../store/features/sesion";

const useRolUsuario = () => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.sesion.info.token)

  const query = useQuery({
    queryKey: ["rol-usuario"],
    queryFn: () => getRol(token),
  })
  
  useMemo(() => {
    if (token.length === 0)
      dispatch(cargarSesion())
  },[token,dispatch])


  return query.data ? query.data.rol : null
}

export default useRolUsuario;