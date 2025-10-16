import React, { createContext, useContext } from "react";

export type BottomTab = "main" | "insurance";

export type MainCoreScreen = "overview" | "covered";
export type EventScreen = "details" | "transactions";

export type HomeContextType = {
  tab: BottomTab;
  setTab: (t: BottomTab) => void;
  mainGroup: "core" | "event";
  setMainGroup: (g: "core" | "event") => void;
  core: MainCoreScreen;
  setCore: (c: MainCoreScreen) => void;
  eventRoute: EventScreen;
  setEventRoute: (r: EventScreen) => void;
  insurance: "open" | "closed";
  setInsurance: (s: "open" | "closed") => void;
  goToEvent: () => void;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const useHome = (): HomeContextType => {
  const ctx = useContext(HomeContext);
  if (!ctx) {
    throw new Error("useHome must be used within HomeContext provider");
  }
  return ctx;
};

export default HomeContext;
