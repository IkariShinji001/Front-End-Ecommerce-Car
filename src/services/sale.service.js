import api from "./axiosConfig";

export const getProfitByMonths = async () => {
  try {
    const res = await api.get("/sales/profit-by-month");
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    return false;
  }
};

export const getCarSoldByMonths = async () => {
  try {
    const res = await api.get("/sales/car-sold-by-month");
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    return false;
  }
};

export const getTotalCarsSold = async () => {
  try {
    const res = await api.get("/sales/cars/total");
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    return false;
  }
};

export const getTotalSale = async () => {
  try {
    const res = await api.get("/sales/total-sale");
    if (res.data) {
      return res.data.totalSale;
    }
  } catch (error) {
    return false;
  }
};

export const getAllCarSoldSortedDate = async () => {
  try {
    const res = await api.get("/sales/cars");
    if (res.data) {
      return res.data;
    }
  } catch (error) {
    return false;
  }
};
