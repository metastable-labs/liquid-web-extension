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

export type { EventsResponse, EventDetailResponse };
