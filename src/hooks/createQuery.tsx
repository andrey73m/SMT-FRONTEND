import { createSearchParams, useLocation } from "react-router-dom"

export const useCreateRedireccionQuery = () => {
  const { pathname } = useLocation()
  return createSearchParams({
    redireccion: pathname
  }).toString()
}