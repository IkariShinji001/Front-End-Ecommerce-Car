import api from "./axiosConfig";
import jwt from "jsonwebtoken";

export const login = async ({ username, password }) => {
  try {
    const res = await api.post("/auth/login", { username, password });
    if (res.data.success) {
      const decoded = jwt.decode(res.data.accessToken);
      return decoded;
    }
  } catch (error) {
    return false;
  }
};

export const logout = async () => {
  try {
    const res = await api.post("/auth/logout");
    if (res.data.success) {
      return true;
    }
  } catch (error) {
    return false;
  }
};
