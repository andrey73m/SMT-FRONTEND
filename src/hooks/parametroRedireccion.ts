import { useSearchParams } from "react-router-dom"

export const useRedireccionParam = () => {
  const [searchParams] = useSearchParams()
  
  return searchParams.get("redireccion") || "/"
}