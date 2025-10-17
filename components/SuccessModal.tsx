import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import Success from "../public/icons/success";
import ClickAnimation from "./ClickAnimation";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  children: React.ReactNode;
  onClose?: () => void;
  onCloseTitle?: string;
};

export default function SuccessModal({
  open,
  setOpen,
  children,
  onClose,
  onCloseTitle,
}: Props) {
  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2147483000] bg-black/50 -my-5"
          />

          {/* Modal container */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="fixed inset-0 z-[2147483001] grid place-items-center p-4"
          >
            <div
              role="dialog"
              aria-modal="true"
              className="w-[328px] max-h-[530px] rounded-3xl bg-white flex flex-col justify-between gap-12 p-[30px] pt-12 overflow-hidden"
            >
              <div className="grid place-items-center">
                <Success />
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-6">
                <div className="flex-1 overflow-auto">{children}</div>

                <ClickAnimation
                  type="button"
                  onClick={handleClose}
                  className="h-8 rounded-lg bg-[#002132] border border-[#002132] text-white text-xs font-medium shadow-sm"
                >
                  {onCloseTitle || "Done"}
                </ClickAnimation>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
