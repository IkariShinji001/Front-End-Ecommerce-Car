import api from "../services/axiosConfig";

export const getAllTestDriveBooking = async (option = null) => {
  const { page, limit, sortedDate } = option || {};
  const listTestDriveBooking = await api.get("/test-drive-booking", {
    params: {
      page,
      limit,
      sortedDate,
    },
  });
  return listTestDriveBooking.data;
};
