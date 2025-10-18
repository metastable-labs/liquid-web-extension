import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../../src/AppContext";

const BuyInsurance: React.FC = () => {
  const { setCurrentPage, goBack } = useApp();
  const [selectedBet, setSelectedBet] = useState("");
  const [insuranceAmount, setInsuranceAmount] = useState("");
  const [coverage, setCoverage] = useState("50");

  const handlePurchase = () => {
    // Mock purchase logic
    alert("Insurance purchased successfully!");
    // After purchase return to home
    setCurrentPage("home");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="flex flex-col h-full">
      <motion.div
        className="flex items-center justify-between p-4 border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.button
          onClick={() => goBack()}
          className="text-gray-600 hover:text-gray-800 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back
        </motion.button>
        <motion.h1
          className="text-lg font-bold text-gray-800"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Buy Insurance
        </motion.h1>
        <div className="w-6"></div> {/* Spacer for centering */}
      </motion.div>

      <motion.div
        className="flex-1 p-4 space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Bet to Insure
          </label>
          <motion.select
            value={selectedBet}
            onChange={(e) => setSelectedBet(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <option value="">Choose a bet...</option>
            <option value="election-2024">2024 Election Winner</option>
            <option value="crypto-btc">Bitcoin Price in 2024 $100k</option>
            <option value="sports-superbowl">Super Bowl Winner</option>
          </motion.select>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insurance Amount (USDC)
          </label>
          <motion.input
            type="number"
            value={insuranceAmount}
            onChange={(e) => setInsuranceAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Coverage Percentage: {coverage}%
          </label>
          <motion.input
            type="range"
            min="10"
            max="90"
            value={coverage}
            onChange={(e) => setCoverage(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10%</span>
            <span>90%</span>
          </div>
        </motion.div>

        {selectedBet && insuranceAmount && (
          <motion.div
            className="bg-blue-50 p-4 rounded-lg border border-blue-200"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-medium text-blue-800 mb-2">
              Insurance Summary
            </h3>
            <motion.div
              className="text-sm text-blue-700 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <p>
                Premium: ${(parseFloat(insuranceAmount) * 0.05).toFixed(2)} USDC
              </p>
              <p>Coverage: {coverage}% of bet amount</p>
              <p>
                Max Payout: $
                {(
                  (parseFloat(insuranceAmount) * parseFloat(coverage)) /
                  100
                ).toFixed(2)}{" "}
                USDC
              </p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="p-4 border-t border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.button
          onClick={handlePurchase}
          disabled={!selectedBet || !insuranceAmount}
          className={`w-full py-3 px-4 font-medium rounded-lg transition-colors ${
            selectedBet && insuranceAmount
              ? "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          whileHover={{
            scale: selectedBet && insuranceAmount ? 1.02 : 1,
          }}
          whileTap={{
            scale: selectedBet && insuranceAmount ? 0.98 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          Purchase Insurance
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BuyInsurance;
