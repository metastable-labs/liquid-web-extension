import { createContext, useContext } from "react";
import type { Page } from "./App";

export type AppContextType = {
  currentPage: Page;
  setCurrentPage: (p: Page) => void;
  // go back in history (if available)
  goBack: () => void;
  // whether navigation stack allows going back
  canGoBack: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppContext provider");
  return ctx;
};

export default AppContext;
