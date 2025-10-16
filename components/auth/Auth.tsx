"use client";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OtpInput from "react-otp-input";

import Button from "../Button";
import Logo from "../../public/icons/logo";
import Liquid from "../../public/icons/liquid";
import GoogleIcon from "../../public/icons/google";
import Wallet from "../../public/icons/wallet-icon";
import MailIcon from "../../public/icons/mail";
import type { Page } from "../../src/App";

type Mode = "welcome" | "email" | "otp";

export default function AuthWelcome({
  setCurrentPage,
}: {
  setCurrentPage: (page: Page) => void;
}) {
  const [mode, setMode] = useState<Mode>("welcome");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const emailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );

  const otpComplete = otp.length === 6;

  const canContinue =
    (mode === "email" && emailValid && !submitting) ||
    (mode === "otp" && otpComplete && !verifying);

  const goEmail = () => setMode("email");

  const handleContinue = async () => {
    if (mode === "email") {
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 800));
      setSubmitting(false);
      setMode("otp");
      return;
    }
    if (mode === "otp") {
      setVerifying(true);
      await new Promise((r) => setTimeout(r, 800));
      setVerifying(false);
      setCurrentPage("home");
    }
  };

  return (
    <div className="relative h-full pt-7 px-4 overflow-hidden">
      <header className="relative select-none w-full h-7">
        <motion.div
          className="absolute top-0 left-0 flex items-start gap-2"
          initial={false}
          animate={
            mode !== "welcome" ? { left: 0, x: 0 } : { left: "50%", x: "-50%" }
          }
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform" }}
        >
          <Logo />
          <motion.div
            initial={false}
            animate={{ opacity: mode !== "welcome" ? 0 : 1 }}
            transition={{
              duration: 0.44,
              delay: mode !== "welcome" ? 0.68 : 0,
            }}
            className={mode !== "welcome" ? "pointer-events-none" : ""}
          >
            <Liquid />
          </motion.div>
        </motion.div>
      </header>

      <div className="relative mt-20 w-full">
        <AnimatePresence initial={false} mode="wait">
          {mode === "welcome" ? (
            <motion.div
              key="welcome"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 12,
                transition: { duration: 0.56 },
              }}
              className="flex flex-col gap-12 w-full"
            >
              <p className="text-[28px] leading-[33.6px] tracking-[1px] text-[#334155] text-center font-quanta">
                Welcome to <br />
                Liquid Insurance
              </p>

              <div className="self-stretch flex flex-col items-stretch gap-4">
                <Button
                  variant="secondary"
                  leading={<GoogleIcon />}
                  aria-label="Continue with Google"
                >
                  Continue with Google
                </Button>

                <Button
                  variant="secondary"
                  leading={<Wallet />}
                  aria-label="Continue with wallet"
                >
                  Continue with wallet
                </Button>

                <Button
                  variant="primary"
                  aria-label="Continue with Email"
                  onClick={goEmail}
                >
                  Continue with Email
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={mode}
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="w-full max-w-md mx-auto"
            >
              {mode === "email" ? (
                <>
                  <div className="space-y-2">
                    <h2 className="text-[28px] leading-[33.5px] text-[#020617] font-bold font-quanta tracking-[0.28px]">
                      Enter your <br /> email address
                    </h2>
                    <p className="text-[16px] leading-[19.84px] text-[#717680]">
                      Enter your email to access your account
                    </p>
                  </div>

                  <motion.div layoutId="auth-field" className="mt-8">
                    <div className="flex items-center gap-2 h-12 rounded-lg border border-[#E2E3F0] px-4 py-3">
                      <MailIcon />
                      <input
                        type="email"
                        inputMode="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white outline-none text-base text-[#002132] placeholder:text-[#9498B8] font-normal"
                      />
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <h2 className="text-[28px] leading-[33.5px] text-[#020617] font-bold font-quanta tracking-[0.28px]">
                      Check your inbox
                    </h2>
                    <p className="text-[16px] leading-[19.84px] text-[#717680]">
                      We’ve sent a 6-digit code to your email
                    </p>
                  </div>

                  <motion.div layoutId="auth-field" className="mt-8">
                    <div className="flex items-center">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputType="tel"
                        skipDefaultStyles
                        containerStyle="otp-container"
                        renderSeparator={
                          <span className="otp-sep" aria-hidden />
                        }
                        renderInput={(props, i) => (
                          <input
                            {...props}
                            key={i}
                            className="otp-box"
                            style={{
                              borderColor: otpComplete ? "#22C55E" : "#E2E3F0",
                            }}
                          />
                        )}
                      />
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 px-4">
        <AnimatePresence initial={false} mode="wait">
          {mode === "welcome" && (
            <motion.div
              key="legal"
              initial={false}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 48, opacity: 0, transition: { duration: 0.6 } }}
              className="text-center text-[10px] text-[#64748B] px-5"
            >
              <span>By continuing, you agree to Liquid’s </span>
              <a
                href="#"
                className="underline underline-offset-2 text-[#162664]"
              >
                Terms of Services
              </a>
              <span> and acknowledge their </span>
              <a
                href="#"
                className="underline underline-offset-2 text-[#162664]"
              >
                Privacy Policy
              </a>
              <span>.</span>
            </motion.div>
          )}

          {mode !== "welcome" && (
            <motion.div
              key="continue-bottom"
              initial={{ y: 64, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{
                y: 64,
                opacity: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="pb-1"
            >
              <Button
                variant="primary"
                disabled={!canContinue}
                loading={submitting || verifying}
                aria-busy={submitting || verifying}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
