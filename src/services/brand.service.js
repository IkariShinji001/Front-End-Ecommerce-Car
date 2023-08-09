import api from "@/services/axiosConfig";
import { useToast } from "vue-toastification";
const toast = useToast();
export const getBrand = async (option = null) => {
  const { brand, page, limit } = option || {};
  try {
    const res = await api.get("/brands", {
      params: {
        brand,
        page,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    throw Error(error);
  }
};

export const getTotalBrand = async () => {
  try {
    const res = await api.get("/brands/total");
    return res.data[0];
  } catch (error) {
    throw Error(error);
  }
};

export const createBrand = async (brandData) => {
  const dataForm = new FormData();
  dataForm.append("image", brandData.image[0]);
  dataForm.append("brand", brandData.brand);
  dataForm.append("country", brandData.country);
  const res = await api.post("/brands", dataForm, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const createColorImage = async (payload) => {
  try {
    const dataForm = new FormData();
    dataForm.append("image", payload.image);
    dataForm.append("newColorName", payload.newColorName);
    const res = await api.post(`/brands/${payload._id}/colors`, dataForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteBrand = async (id) => {
  try {
    await api.delete(`/brands/${id}`);
    toast.success("Xóa thương hiệu thành công");
  } catch (error) {
    toast.error("Lỗi trong quá trình xóa");
    return error;
  }
};

export const deleteColorBrand = async (payload) => {
  try {
    await api.patch(`/brands/${payload.id}/colors`, {
      urlCloudinary: payload.urlCloudinary,
    });
    toast.success("Xóa màu thành công");
  } catch (error) {
    console.log(error);
    toast.error("Lỗi trong quá trình xóa màu");
    return error;
  }
};
