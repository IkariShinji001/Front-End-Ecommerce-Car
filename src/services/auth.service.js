import axios from "axios";
import jwt from "jsonwebtoken";


const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
export const login = async ({username, password}) =>{
    try {
        const res = await api.post("/auth/login", {username, password});
        if(res.data.token){
            localStorage.setItem("token", res.data.token);
            const decodedToken = jwt.decode(res.data.token);
            return {decodedToken, token: res.data.token};
        }
      } catch (error) {
        return false;
      }
}
