import authService from "@/services/authService"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const useOnline = () => {
  const queryOnline = useQuery<string[]>({
    queryKey: ["ids-online"],
    queryFn: authService.obtenerOnline,
    refetchOnWindowFocus: false,
    retry:1,
    staleTime: Infinity
  })

  return queryOnline
}

export const useValidarOnline = (idusuario?: string) => {
  const [isOnline, setIsOnline] = useState(false)
  const { data: usuariosOnline, isLoading } = useOnline()

  useEffect(() => {
    if (usuariosOnline && idusuario)
      setIsOnline(!!usuariosOnline.find(id => id === idusuario))
  },[usuariosOnline])

  return { isOnline, isLoading }
}

export const useMutacionOnline = () => {
  const queryClient = useQueryClient()

  return {
    invalidarOnline: () => queryClient.invalidateQueries({ queryKey:["ids-online"] })
  }

}