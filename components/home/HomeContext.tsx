import { createContext, useContext } from "react";

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
  // Consumers should fetch the full event from backend using this id.
  activeEventId: string | null;
  setActiveEventId: (id: string | null) => void;
};

/**
 * HomeContext
 * Provides home-specific UI state (tabs, sub-screens) and minimal selection
 * identifiers (e.g. activeEventId). Keep the context lightweight: only
 * store identifiers and small setters here — fetch full event data elsewhere.
 */
const HomeContext = createContext<HomeContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useHome = (): HomeContextType => {
  const ctx = useContext(HomeContext);
  if (!ctx) {
    throw new Error("useHome must be used within HomeContext provider");
  }
  return ctx;
};

export default HomeContext;
