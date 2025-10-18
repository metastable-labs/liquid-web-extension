import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      try {
        // Use dynamic import to break the circular dependency
        // const { default: api } = await import("@/stores/api");
        // const response = await api.refreshJWT();
        // await storeData("token", response.token);
        // await setTokenHeader(response.token);
        // if (error.config?.headers) {
        //   // Update the original request's headers with the new token.
        //   error.config.headers.Authorization = `Bearer ${response.token}`;
        //   // Retry the request using the original config.
        //   return axiosInstance(error.config);
        // }
      } catch (e) {
        console.log(e);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

const setTokenHeader = async (token?: string) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export { axiosInstance, setTokenHeader };
