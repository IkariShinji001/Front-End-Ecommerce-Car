import api from "@/services/axiosConfig"

export const isLogin = async () =>{
        try {
          const res = await api.post("/auth/verify/access-token");
          if(res.data.success){
            return true;
          }else{
            return false;
          }
        } catch (error) {
          return false;
        }
 }