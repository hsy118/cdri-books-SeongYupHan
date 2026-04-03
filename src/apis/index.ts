import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dapi.kakao.com/v3",
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_REST_API_KEY}`,
  },
});

export default axiosInstance;
