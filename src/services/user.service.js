import api from "./axiosConfig";

export const getTotalUser = async () => {
  try {
    const res = await api.get("/users/total");
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    return false;
  }
};
