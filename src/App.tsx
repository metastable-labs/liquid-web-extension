import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import classNames from "classnames";

import "./App.css";
import Auth from "../components/auth/Auth";
import Home from "../components/home";
import BuyInsurance from "../components/buy-insurance/BuyInsurance";
import WithdrawFunds from "../components/withdraw";
import AppContext from "./AppContext";

export type Page = "auth" | "home" | "buy" | "withdraw";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const historyRef = useRef<Page[]>([currentPage]);
  const [direction, setDirection] = useState<1 | -1 | 0>(0);
  const reduce = useReducedMotion();

  const canGoBack = historyRef.current.length > 1;

  const navigate = (to: Page) => {
    if (to === currentPage) return;

    const stack = historyRef.current;
    const prev = stack[stack.length - 2];

    if (prev && prev === to) {
      stack.pop();
      setDirection(-1);
    } else {
      stack.push(to);
      setDirection(1);
    }
    setCurrentPage(to);
  };

  const goBack = () => {
    const stack = historyRef.current;
    if (stack.length > 1) {
      stack.pop();
      setDirection(-1);
      setCurrentPage(stack[stack.length - 1]);
    }
  };

  const contextValue = useMemo(
    () => ({
      currentPage,
      setCurrentPage: navigate,
      goBack,
      canGoBack,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage, canGoBack]
  );

  const EASE = [0.22, 1, 0.36, 1] as const;
  const pageVariants = {
    initial: (dir: 1 | -1 | 0) =>
      reduce
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: dir === 0 ? 0 : dir > 0 ? 24 : -24,
          },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: 1 | -1 | 0) =>
      reduce
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: dir === 0 ? 0 : dir > 0 ? -16 : 16,
          },
  } as const;

  const pageTransition = reduce
    ? { duration: 0.16, ease: "linear" as const }
    : { type: "tween" as const, ease: EASE, duration: 0.28 };

  const renderPage = () => {
    switch (currentPage) {
      case "auth":
        return <Auth />;
      case "home":
        return <Home />;
      case "buy":
        return <BuyInsurance />;
      case "withdraw":
        return <WithdrawFunds />;
      default:
        return <Auth />;
    }
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <AppContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={classNames(
          "grid grid-rows-1 grid-cols-1 w-[360px] h-[600px] bg-white shadow-lg overflow-hidden font-aeonik rounded-2xl",
          currentPage !== "home" && "py-5",
          currentPage === "withdraw" && "pb-0"
        )}
        style={{ contain: "paint", backfaceVisibility: "hidden" }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentPage}
            className="row-start-1 col-start-1 h-full will-change-transform"
            style={{ gridArea: "1 / 1 / 2 / 2", touchAction: "pan-y" }}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            drag={canGoBack && !reduce ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.02}
            dragMomentum={false}
            dragDirectionLock
            onDragEnd={(_, info) => {
              const width = containerRef.current?.offsetWidth ?? 360;
              const threshold = width * 0.22;
              const fast = Math.abs(info.velocity.x) > 800;
              if (info.offset.x > threshold || (fast && info.offset.x > 0)) {
                goBack();
              }
            }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}

export default App;
