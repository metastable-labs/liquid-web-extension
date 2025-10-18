import * as React from "react";

import CopyButton from "../CopyButton";
import SuccessModal from "../SuccessModal";
import ClickAnimation from "../ClickAnimation";
import Base from "../../src/assets/base";
import ExternalLink from "../../src/assets/ExternalLink";

type Data = {
  formattedAmount: string;
  address: string;
  estimatedArrival: string;
  txId: string;
  explorerUrl?: string;
};

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  data: Data;
};

function shortHex(hex: string, head = 4, tail = 4) {
  if (!hex) return "";
  if (hex.length <= head + tail) return hex;
  return `${hex.slice(0, head)}...${hex.slice(-tail)}`;
}

export default function WithdrawSuccessModal({ open, setOpen, data }: Props) {
  const { formattedAmount, address, estimatedArrival, txId, explorerUrl } =
    data;

  return (
    <SuccessModal open={open} setOpen={setOpen}>
      <div className="flex flex-col items-stretch self-stretch gap-6">
        <div className="flex flex-col gap-2 items-center justify-center">
          <h4 className="text-[14px] leading-[15.68px] text-black font-bold font-quanta">
            Withdrawal Successful!
          </h4>
          <div className="flex items-center gap-1">
            <img
              src="/images/usdc.png"
              alt="USDC"
              className="size-8 rounded-full mt-1"
            />
            <span className="text-[36px] leading-[44px] tracking-[-0.72px] text-[#0F172A] font-bold">
              {formattedAmount}
            </span>
          </div>
        </div>

        <div className="w-full h-px bg-[#EAEEF4]" />

        <div className="flex flex-col items-stretch gap-2">
          <h4 className="text-[14px] leading-[18.48px] text-black font-bold">
            Transaction Details
          </h4>

          <Row>
            <span>Amount withdrawn</span>
            <span>{formattedAmount} USDC</span>
          </Row>

          <Row>
            <span>Withdrawal address</span>
            <span>{shortHex(address)}</span>
          </Row>

          <Row>
            <span>Network</span>
            <div className="flex items-center gap-1">
              <Base />
              <span>Base</span>
            </div>
          </Row>

          <Row>
            <span>Estimated arrival</span>
            <span>{estimatedArrival}</span>
          </Row>

          <Row>
            <span>Transaction ID</span>
            <div className="flex items-center gap-1">
              <span>{shortHex(txId, 4, 4)}</span>
              <CopyButton value={txId} />
              <div className="w-px h-[15px] bg-[#E2E8F0]" />

              <ClickAnimation>
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View on explorer"
                >
                  <ExternalLink width={16} height={16} />
                </a>
              </ClickAnimation>
            </div>
          </Row>
        </div>
      </div>
    </SuccessModal>
  );
}

function Row({ children }: React.PropsWithChildren) {
  return (
    <div className="flex items-center justify-between text-[14px] leading-[18.48px] text-[#64748B]">
      {children}
    </div>
  );
}
