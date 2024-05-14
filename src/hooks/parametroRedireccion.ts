import { useSearchParams } from "react-router-dom"

export const useRedireccionParam = (def: string | number = -1) => {
  const [searchParams] = useSearchParams()
  
  return searchParams.get("redireccion") || def
}