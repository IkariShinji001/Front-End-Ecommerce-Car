import axios from "axios";
import jwt from "jsonwebtoken";

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Thay thế bằng URL của API bạn đang làm việc
    headers: {
      'Content-Type': 'application/json', // Có thể tùy chỉnh các headers khác tại đây
    },
  });
  
export const login = async (username, password) =>{
    try {
        const res = await api.post("/auth/login", { username, password });
        if(res.data.token){
            localStorage.setItem("token", JSON.stringify(res.data.token));
            const decodedToken = jwt.decode(res.data.token);
            return decodedToken;
        }
      } catch (error) {
        return false;
      }
}
