import axios from "axios";
import { getToken } from "../utils/storage";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default {
  get: axios.get,
  post: axios.post,
};
