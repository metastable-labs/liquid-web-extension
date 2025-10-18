import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useApp } from "../../src/AppContext";
import Close from "../../src/assets/close";
import ClickAnimation from "../ClickAnimation";
import Button from "../Button";
import { useExtensionStorage } from "../../hooks/useExtensionStorage";

const STEPS = [
  {
    title: "Find Insurable Events",
    desc: `Look for the "Insurable event" badge on markets where coverage is available.`,
    cta: "Next",
  },
  {
    title: "Purchase Coverage",
    desc: "Select and buy insurance for specific outcomes you want to hedge against.",
    cta: "Next",
  },
  {
    title: "Get Protected",
    desc: "Receive payout if the insured outcome occurs, limiting your losses.",
    cta: "Get Started",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;
const ONBOARDED_KEY = "liquid:onboarded.v1";

export default function Onboarding() {
  const reduce = useReducedMotion();
  const { setCurrentPage } = useApp();

  const { value: hasOnboarded = false, set: setHasOnboarded } =
    useExtensionStorage<boolean>(ONBOARDED_KEY, false);

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<1 | -1 | 0>(0);
  const middleRef = useRef<HTMLDivElement | null>(null);

  const pageVariants = useMemo(
    () => ({
      initial: (d: 1 | -1 | 0) =>
        reduce
          ? { opacity: 0 }
          : { opacity: 0, x: d === 0 ? 0 : d > 0 ? 24 : -24 },
      animate: { opacity: 1, x: 0 },
      exit: (d: 1 | -1 | 0) =>
        reduce
          ? { opacity: 0 }
          : { opacity: 0, x: d === 0 ? 0 : d > 0 ? -16 : 16 },
    }),
    [reduce]
  );

  const pageTransition = reduce
    ? { duration: 0.16, ease: "linear" as const }
    : { type: "tween" as const, ease: EASE, duration: 0.28 };

  const canPrev = step > 0;
  const canNext = step < STEPS.length - 1;

  const goPrev = () => {
    if (!canPrev) return;
    setDir(-1);
    setStep((s) => s - 1);
  };

  const finishAndGoAuth = async () => {
    await setHasOnboarded(true);
    setCurrentPage?.("auth");
  };

  const goNext = async () => {
    if (canNext) {
      setDir(1);
      setStep((s) => s + 1);
    } else {
      await finishAndGoAuth();
    }
  };

  const close = async () => await finishAndGoAuth();

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) goPrev();
    else goNext();
  };

  const isLast = step === STEPS.length - 1;
  const ctaText = isLast
    ? hasOnboarded
      ? "Got it"
      : STEPS[step].cta
    : STEPS[step].cta;

  return (
    <div
      className="flex h-full flex-col items-stretch gap-11 bg-[#071C2C] text-white px-6 py-[29px]"
      style={{ contain: "paint", backfaceVisibility: "hidden" }}
    >
      <div className="flex items-center justify-between">
        <Progress step={step} />
        <ClickAnimation aria-label="Close" onClick={close}>
          <Close />
        </ClickAnimation>
      </div>

      <motion.div
        ref={middleRef}
        className="relative mb-1 flex-1 select-none"
        onClick={handleTap}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.02}
        dragMomentum={false}
        dragDirectionLock
        onDragEnd={(_, info) => {
          const width = middleRef.current?.offsetWidth ?? 360;
          const threshold = width * 0.22;
          const fast = Math.abs(info.velocity.x) > 800;
          if (info.offset.x > threshold || (fast && info.offset.x > 0)) {
            goPrev();
          } else if (
            info.offset.x < -threshold ||
            (fast && info.offset.x < 0)
          ) {
            goNext();
          }
        }}
      >
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="absolute inset-0 grid place-items-start"
          >
            <div className="w-full flex flex-col items-stretch gap-11">
              <div className="h-[240px] w-full rounded-2xl bg-white" />

              <div className="text-center">
                <h2 className="text-[24px] leading-[28.8px] font-semibold tracking-[1px] font-quanta">
                  {STEPS[step].title}
                </h2>
                <p className="mt-3.5 text-[14px] leading-[18.48px]">
                  {STEPS[step].desc}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <Button onClick={goNext}>{ctaText}</Button>
    </div>
  );
}

function Progress({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const EASE = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="flex gap-3">
      {[0, 1, 2].map((i) => {
        const filled = i < step ? 100 : i === step ? 100 : 0;
        return (
          <div
            key={i}
            className="h-1 w-6 overflow-hidden rounded-full bg-[#C6DDFF]"
          >
            <motion.div
              className="h-full bg-[#4691FE]"
              initial={{ width: i < step ? "100%" : "0%" }}
              animate={{ width: `${filled}%` }}
              transition={
                reduce ? { duration: 0.1 } : { duration: 0.35, ease: EASE }
              }
            />
          </div>
        );
      })}
    </div>
  );
}
