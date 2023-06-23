import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
export const getProfitByMonths = async () =>{
    try {
        const res = await api.get("/sales/profit-by-month");
        if(res.data){
            return res.data;
        }
      } catch (error) {
        return false;
      }
}


export const getCarSoldByMonths = async () =>{
  try {
      const res = await api.get("/sales/car-sold-by-month");
      if(res.data){
          return res.data;
      }
    } catch (error) {
      return false;
    }
}

export const getTotalCarsSold = async () =>{
  try {
    const res = await api.get("/sales/cars/total");
    if(res.data){
      return res.data;
    }
  } catch (error) {
    return false;   
  }
}