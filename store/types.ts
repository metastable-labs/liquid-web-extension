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

type EventsResponse = {
  data: {
    id: string;
    slug: string;
    title: string;
    description: string;
    maxCoveragePercent: number;
  }[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export enum Outcome {
  Yes = "Yes",
  No = "No",
}

type EventDetailResponse = {
  id: string;
  slug: string;
  title: string;
  description: string;
  maxCoveragePercent: number;
  startDate: string;
  endDate: string;
  category: string;
  imageUrl: string;
  isActive: boolean;
  markets: {
    id: string;
    question: string;
    outcomes: Outcome[];
    volume: number;
    liquidity: number;
    active: boolean;
    prices: {
      [key in Outcome]: number;
    };
  }[];
  createdAt: string;
  updatedAt: string;
};

export type {
  AuthResponse,
  RefreshTokenResponse,
  EventsResponse,
  EventDetailResponse,
  UserResponse,
};
