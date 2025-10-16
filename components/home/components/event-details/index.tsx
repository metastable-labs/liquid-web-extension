import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";

import ClickAnimation from "../../../ClickAnimation";
import Button from "../../../Button";
import { useHome } from "../../HomeContext";
import { formatCurrency, clamp } from "../../../../utils/functions";

const EVENT_PLACEHOLDER = {
  variant: "position" as "position" | "event",
  title: "Russia and Ukraine ceasefire in 2025?kshdjb",
  thumbnailUrl: "images/dummy_event.png",
  outcome: "Yes" as "Yes" | "No",
  totalValueUsd: 5200,
  premiumPerPercentUsd: 75 / 35,
};

export default function EventDetails() {
  const { activeEventId } = useHome();

  const isEventVariant = EVENT_PLACEHOLDER.variant === "event";
  const maxInsurablePercent = isEventVariant ? 30 : 75;

  const [selectedPercent, setSelectedPercent] = useState(35);

  const premiumCost = useMemo(
    () => Math.max(0, selectedPercent * EVENT_PLACEHOLDER.premiumPerPercentUsd),
    [selectedPercent]
  );

  const exceedsMaxPercent = selectedPercent > maxInsurablePercent;

  const increasePercent = () => setSelectedPercent((p) => clamp(p + 5, 0, 100));
  const decreasePercent = () => setSelectedPercent((p) => clamp(p - 5, 0, 100));
  const setPercentToMax = () => setSelectedPercent(maxInsurablePercent);

  useEffect(() => {
    console.log("EventDetails activeEventId:", activeEventId);
  }, [activeEventId]);

  return (
    <section className="rounded-2xl border border-[#EAEEF4] bg-white px-4 pt-6 pb-28">
      <div className="flex items-start gap-3">
        <img
          src={EVENT_PLACEHOLDER.thumbnailUrl}
          alt={EVENT_PLACEHOLDER.title}
          className="size-9 rounded-xl object-cover"
        />
        <p className="text-[14px] font-bold leading-[18.48px] text-[#334155]">
          {EVENT_PLACEHOLDER.title}
        </p>
      </div>

      <div className="my-4 border-t border-dashed border-[#E2E8F0]" />

      <div className="flex flex-col gap-2 pb-4 font-medium">
        <div className="flex items-center justify-between">
          <span className="text-[12px] leading-[14.88px] text-[#64748B]">
            Selected outcome
          </span>
          <span
            className={classNames(
              "rounded-md px-1.5 py-0.5 text-xs text-white",
              EVENT_PLACEHOLDER.outcome === "Yes" && "bg-[#17B26A]",
              EVENT_PLACEHOLDER.outcome === "No" && "bg-[#EF4444]"
            )}
          >
            {EVENT_PLACEHOLDER.outcome}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[12px] leading-[14.88px] text-[#64748B]">
            Total position value
          </span>
          <span className="text-[12px] leading-[14.88px] text-[#64748B]">
            {formatCurrency(EVENT_PLACEHOLDER.totalValueUsd, 0)}
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-[#F1F5F9] p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[14px] font-medium text-[#334155]">
            {isEventVariant ? "Insure this event" : "Insure this position"}
          </p>
          <ClickAnimation
            onClick={setPercentToMax}
            className="rounded-md bg-[#CBD5E1] px-2 py-1 text-[12px] font-medium text-[#334155]"
          >
            Max
          </ClickAnimation>
        </div>

        <div className="rounded-2xl border border-[#E2E8F0] bg-white px-3 py-2">
          <div className="flex items-center justify-between px-12">
            <ClickAnimation
              onClick={decreasePercent}
              className="select-none text-[20px] leading-[22.4px] text-[#000]"
            >
              -
            </ClickAnimation>

            <span
              className={classNames(
                "select-none text-2xl font-extrabold tracking-tight min-w-[60px] text-center transition-colors duration-500",
                exceedsMaxPercent ? "text-[#F04438]" : "text-[#334155]"
              )}
            >
              {selectedPercent}%
            </span>

            <ClickAnimation
              onClick={increasePercent}
              className="select-none text-[20px] leading-[22.4px] text-[#000]"
            >
              +
            </ClickAnimation>
          </div>
        </div>

        <AnimatePresence initial={false} mode="wait">
          {exceedsMaxPercent && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ overflow: "hidden" }}
            >
              <p className="text-center text-[13px] leading-[16.12px] text-[#F04438]">
                Maximum of {maxInsurablePercent}% insurable for this{" "}
                {isEventVariant ? "event" : "position"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between text-[12px] leading-[14.88px] font-medium text-[#64748B]">
          <span>You pay</span>
          <span>{formatCurrency(premiumCost)}</span>
        </div>

        <Button
          className="mt-4"
          variant="primary"
          size="md"
          disabled={exceedsMaxPercent || selectedPercent === 0}
        >
          {exceedsMaxPercent || selectedPercent === 0
            ? isEventVariant
              ? "Insure event"
              : "Insure position"
            : `${
                isEventVariant ? "Insure event" : "Insure position"
              } with ${formatCurrency(premiumCost)}`}
        </Button>
      </div>
    </section>
  );
}
