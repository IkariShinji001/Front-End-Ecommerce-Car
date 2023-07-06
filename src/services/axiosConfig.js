import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Gửi yêu cầu để làm mới access token bằng refresh token
        await api.post('/auth/refresh-token', {withCredentials: true});
        // Gửi lại yêu cầu ban đầu với access token mới
        return api(originalRequest);
      } catch (refreshError) {
        await store.dispatch('user/logout');
        router.push("/");
        console.error(refreshError);
        // Đăng xuất người dùng hoặc chuyển hướng đến trang đăng nhập
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
