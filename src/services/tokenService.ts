import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export default {
  getToken: (): string =>  {
    return cookies.get("token")
  },
  setToken: (token: string) => {
    cookies.remove("token",{ path: "/" })
    cookies.set("token", token,{ path: "/" })
  },
  removeToken: () => {
    cookies.remove("token",{ path: "/" })
  },
  decodeToken: (token: string) => {
    try{
      return jwtDecode(token);
    }catch(e){
      return null
    }
  },
  getAuthHeader: () => {
    const token = cookies.get("token")
    return { Authorization: token }
  }
}