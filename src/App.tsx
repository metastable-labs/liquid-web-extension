import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import Auth from "../components/auth/Auth";
import Home from "../components/home/Home";
import BuyInsurance from "../components/buy-insurance/BuyInsurance";

type Page = "auth" | "home" | "buy";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("buy");

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "easeInOut" as const,
    duration: 0.3,
  };

  const renderPage = () => {
    switch (currentPage) {
      case "auth":
        return <Auth onConnect={() => setCurrentPage("home")} />;
      case "home":
        return <Home onNavigateToBuy={() => setCurrentPage("buy")} />;
      case "buy":
        return <BuyInsurance onBack={() => setCurrentPage("home")} />;
      default:
        return <Auth onConnect={() => setCurrentPage("home")} />;
    }
  };

  return (
    <div className="w-[390px] h-[610px] bg-white shadow-lg overflow-auto font-aeonik py-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
          className="h-full"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
