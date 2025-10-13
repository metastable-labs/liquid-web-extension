import React, { useState } from "react";
// import { motion } from "framer-motion";

interface HomeProps {
  onNavigateToBuy: () => void;
}

const tabs = ["Market", "Open Insurance", "Closed Insurance"];

const Home: React.FC<HomeProps> = ({ onNavigateToBuy }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [userIsViewingAnEventDetail, setUserIsViewingAnEventDetail] =
    useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-[#64748B]">Cash balance</p>
          <h1 className="text-3xl font-bold text-[#020617] tracking-tight">
            $1,467.00
          </h1>
        </div>

        <button className="bg-[#F5F5F5] text-[#252B37] text-sm font-bold px-5 py-2 rounded-[14px] cursor-pointer">
          Deposit
        </button>
      </div>

      <div className="mt-5 h-11 border-b border-[#E9EAEB]">
        <div className="flex items-center justify-between h-full px-5">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`text-sm font-bold text-[#020617] h-full border-b-2 cursor-pointer hover:opacity-70 transition-all duration-200 ${
                activeTabIndex === index
                  ? "border-[#020617]"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTabIndex(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
