import api from "@/services/axiosConfig";
import getImageIdFromSecureUrl from "@/helpers/getImageIdFromSecureUrl"

export const getAllCars = async (options) =>{
    const { page, limit, filter } = options || {};
    try {
        const res = await api.get("/cars", {
            params:{
                page,
                limit,
                filter
            }
        });
        return res.data.data;
    } catch (error) {
        return false;
    }
}

export const getCarById = async (carId) =>{
    try {
        const res = await api.get(`/cars/${carId}`);
        return res.data;
    } catch (error) {
        return false;
    }
}

export const getAllBrands = async() =>{
    try{
        const res = await api.get("/brands");
        return res.data;
    }catch(error){
        return false;
    }
}

export const createCar = async (payload) =>{
    try{
        const newCar = await api.post("/cars", payload);
        return newCar.data;
    }catch(error){
        return false;
    }
}

export const uploadCarImages = async (carId , images) =>{
    try{
        const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
    }
    const res = await api.post(`/cars/${carId}/images`, formData,{
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    });
    return res.data;
    }catch{
        return false;
    }
    
}

export const deleteCar = async (carId) => {
    try {
        await api.delete(`/cars/${carId}`);
        return true;
    } catch (error) {
        return false;
    }
}


export const deleteCarImage = async (carId, img) => {
    try {
        img = getImageIdFromSecureUrl(img);
        console.log(carId,img);
        await api.delete(`/cars/${carId}/images/${img}`);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export const updateCar = async (carId, payload) =>{
    console.log(carId);
    try{
        const res = await api.put(`/cars/${carId}`, payload);
        return res.data;
    }catch(error){
        return false;
    }
}

export const getTotalCar = async () =>{
    try {
        const res = await api.get('/cars/total');
        return res.data;
    } catch (error) {
        return false;
    }
}