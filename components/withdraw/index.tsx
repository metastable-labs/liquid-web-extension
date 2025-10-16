"use client";
import * as React from "react";
import classNames from "classnames";

import { useApp } from "../../src/AppContext";
import useFormattedAmount from "../../hooks/useFormattedAmount";
import Base from "../../public/icons/base";
import ChevronRight from "../../public/icons/chevron-right";
import Button from "../Button";
import ClickAnimation from "../ClickAnimation";

const tokenSymbol = "USDC";
const networkName = "Base";

export default function WithdrawFunds() {
  const { goBack } = useApp();
  const [balance, _setBalance] = React.useState(12600);
  const [address, setAddress] = React.useState("");
  const {
    updateAmount,
    amountWithThousandSeparator,
    amountWithoutThousandSeparator,
  } = useFormattedAmount("");
  const [submitting, setSubmitting] = React.useState(false);

  const amount = parseFloat(amountWithoutThousandSeparator);
  const addressValid = /^0x[a-fA-F0-9]{40}$/.test(address.trim());
  const amountValid =
    Number.isFinite(amount) && amount > 0 && amount <= balance;

  const canSubmit = addressValid && amountValid && !submitting;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setAddress(text.trim());
    } catch {
      console.warn("Failed to read clipboard contents");
    }
  };

  const handleMax = () => updateAmount(String(balance));

  const handleNext = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      // TODO
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      <div className="flex items-center gap-2 pb-3 border-b border-b-[#ECECEC] px-4 h-fit bg-white">
        <ClickAnimation
          onClick={() => goBack()}
          className="rotate-180"
          aria-label="Go back"
        >
          <ChevronRight width={24} height={24} />
        </ClickAnimation>
        <h1 className="flex-1 text-center text-[14px] leading-[18.48px] font-bold text-[#252B37]">
          Withdraw funds
        </h1>
        <div className="h-full w-6" aria-hidden />{" "}
      </div>

      <div className="rounded-2xl border border-[#EAEEF4] bg-white px-4 py-6 m-4">
        <FieldLabel>Withdrawal address</FieldLabel>
        <div className="relative">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter withdrawal address"
            className={classNames(baseInputClass, "pr-16")}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
          <ClickAnimation
            type="button"
            onClick={handlePaste}
            className="absolute inset-y-0 right-2 my-1 inline-flex items-center rounded-lg px-2 text-[13px] leading-[16.12px] font-medium text-[#1570EF] hover:bg-[#F1F5FF] transition-colors duration-500"
          >
            Paste
          </ClickAnimation>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <FieldLabel className="m-0">Amount</FieldLabel>
          <FieldLabel className="m-0">
            Balance:{" "}
            {new Intl.NumberFormat("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 6,
            }).format(balance)}{" "}
            {tokenSymbol}
          </FieldLabel>
        </div>

        <div className="relative mt-2">
          <input
            inputMode="decimal"
            placeholder={`${tokenSymbol} Amount`}
            value={amountWithThousandSeparator}
            onChange={(e) => updateAmount(e.target.value)}
            className={classNames(baseInputClass, "pr-[108px]")}
          />

          <div className="absolute inset-y-0 right-4 flex items-center gap-2 h-full py-1">
            <span className="pointer-events-none text-[13px] leading-[16.12px] font-medium text-[#1E293B]">
              {tokenSymbol}
            </span>

            <ClickAnimation
              type="button"
              onClick={handleMax}
              className="h-full inline-flex items-center rounded-lg text-[13px] leading-[16.12px] font-medium text-[#1570EF]"
            >
              Max
            </ClickAnimation>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <FieldLabel className="m-0 text-[#252B37]">
            Withdrawal Network
          </FieldLabel>

          <div className="inline-flex items-center justify-center gap-1 rounded-full bg-[#F1F5F9] px-2 py-1">
            <Base />
            <span className="text-[14px] leading-[18.48px] font-medium text-[#252B37]">
              {networkName}
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-[#FEDF89] bg-[#FFFCF5] px-4 py-2 text-[11px] leading-[13.64px] text-[#F79009]">
          Only withdraw to a USDC address on the Base network. Sending funds to
          an incompatible network may result in loss of assets.
        </div>

        <div className="mt-5">
          <Button
            variant="primary"
            size="md"
            disabled={!canSubmit}
            loading={submitting}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

const baseInputClass =
  "w-full h-[42px] rounded-lg border border-[#E2E8F0] bg-white px-4 text-[13px] placeholder:text-[#CBD5E1] outline-none";

function FieldLabel({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <p
      className={classNames(
        "mb-2 text-xs font-medium text-[#717680]",
        className
      )}
    >
      {children}
    </p>
  );
}
