import { useSearchParams } from "react-router-dom"

export const useRedireccionParam = (def: string = "/") => {
  const [searchParams] = useSearchParams()
  
  return searchParams.get("redireccion") || def
}