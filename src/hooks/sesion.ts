import { useAppSelector } from "@/store";

export const useSesion = () => {
  const { haySesion, info } = useAppSelector(state => state.sesion)
  return { info, haySesion }
}