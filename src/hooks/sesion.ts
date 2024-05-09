import { useAppSelector } from "@/store";

const useSesion = () => {
  const { haySesion, info } = useAppSelector(state => state.sesion)
  return { info, haySesion }
}

export default useSesion;