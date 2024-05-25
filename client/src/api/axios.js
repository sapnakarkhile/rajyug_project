import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // use environment variable
  withCredentials: true, // send cookies with requests
});

instance.interceptors.request.use((config) => {
  const cookie = document.cookie || '';
  const token = cookie
    .split('; ')
    .find(row => row.startsWith('accessToken'))
    ?.split('=')[1];
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


export default instance;
