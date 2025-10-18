type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    walletAddress: string;
    polymarketWalletAddress: string;
  };
};

type UserResponse = {
  id: string;
  email: string;
  walletAddress: string;
  polymarketWalletAddress: string;
  createdAt: string;
  updatedAt: string;
};

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type { AuthResponse, RefreshTokenResponse, UserResponse };
