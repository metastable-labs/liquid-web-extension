import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ClickAnimation from "./ClickAnimation";
import Copy from "../public/icons/copy";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      console.warn("Failed to write to clipboard");
    }
  };

  return (
    <ClickAnimation
      onClick={handleCopy}
      aria-label="Copy transaction ID"
      className="size-4"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ type: "spring", stiffness: 520, damping: 30 }}
            className="inline-flex size-full items-center justify-center rounded-full bg-emerald-500"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
            transition={{ type: "spring", stiffness: 520, damping: 30 }}
          >
            <Copy />
          </motion.span>
        )}
      </AnimatePresence>
    </ClickAnimation>
  );
}

export default CopyButton;
