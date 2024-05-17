import { useLocation, useNavigate } from "react-router-dom"

const useNavigateParams = () => {
  const navigate = useNavigate()
  const { search } = useLocation()

  return (pathname: string, keep = true) => {
    const location: any = { pathname }
    if (keep) location.search = search
    navigate(location)
  }
}

export default useNavigateParams;