import { useAppSelector } from "../store"

const useMenuLateral = () => {
  const { abierto } = useAppSelector(state => state.topBar.menu)

  return { abierto }
}

export default useMenuLateral;