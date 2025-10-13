import React, { useState } from "react";
import { motion } from "framer-motion";

interface AuthProps {
  onConnect: () => void;
}

const Auth: React.FC<AuthProps> = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);

    // Mock loading delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsConnecting(false);
    onConnect();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1
          className="text-2xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Polymarket Insurance
        </motion.h1>
        <motion.p
          className="text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Protect your bets with insurance
        </motion.p>
      </motion.div>

      <motion.div
        className="w-full max-w-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.button
          onClick={handleConnect}
          disabled={isConnecting}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isConnecting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          }`}
          whileHover={{ scale: isConnecting ? 1 : 1.02 }}
          whileTap={{ scale: isConnecting ? 1 : 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {isConnecting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Connecting...
            </div>
          ) : (
            "Connect Wallet"
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Auth;
