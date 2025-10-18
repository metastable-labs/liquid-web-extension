import { AuthResponse, RefreshTokenResponse, UserResponse } from "./types";
import { API_BASE_URL } from "../../constants";
import { axiosInstance } from "../../utils/axios";
import axios from "axios";

const api = {
  login: async ({ idToken }: { idToken: string }) => {
    const response = await axiosInstance.post<AuthResponse>("auth/login", {
      idToken,
    });

    return response.data;
  },

  refreshJWT: async ({ refreshToken }: { refreshToken: string }) => {
    const response = await axios.post<RefreshTokenResponse>(
      `${API_BASE_URL}/auth/refresh`,
      {
        refreshToken,
      }
    );

    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("auth/logout");

    return response.data;
  },

  getUser: async () => {
    const response = await axiosInstance.get<UserResponse>("users/me");

    return response.data;
  },

  updateUser: async ({
    polymarketWalletAddress,
  }: {
    polymarketWalletAddress: string;
  }) => {
    const response = await axiosInstance.patch<UserResponse>("users/me", {
      polymarketWalletAddress,
    });

    return response.data;
  },
};

export default api;
