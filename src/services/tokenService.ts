import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export default {
  getToken: (): string =>  {
    return cookies.get("token")
  },
  setToken: (token: string) => {
    cookies.set("token", token)
  },
  removeToken: () => {
    cookies.remove("token")
  },
  decodeToken: (token: string) => {
    try{
      return jwtDecode(token);
    }catch(e){
      return null
    }
  }
}