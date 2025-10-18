import * as React from "react";

import SuccessModal from "../../../SuccessModal";

type Data = {
  coverage: string;
  protectedAmount: string;
  maximumLoss: string;
  altOutcome: string;
};

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  data: Data;
};

export default function InsuranceSuccessModal({ open, setOpen, data }: Props) {
  const { coverage, protectedAmount, maximumLoss, altOutcome } = data;

  return (
    <SuccessModal
      open={open}
      setOpen={setOpen}
      onClose={() => {}}
      onCloseTitle="View my insurance"
    >
      <div className="flex flex-col items-stretch self-stretch gap-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-[20px] leading-[22.4px] font-bold text-black text-center font-quanta whitespace-nowrap">
            Position Insured Successfully!
          </h3>
          <p className="px-3 text-center text-[12px] leading-[15.84px] text-[#64748B]">
            Your position is now protected. If the outcome{" "}
            <span className="font-bold text-[#1E293B]">"{altOutcome}"</span>{" "}
            occurs, you'll receive a payout to offset your losses.
          </p>
        </div>

        <div className="w-full h-px bg-[#EAEEF4]" />

        <div className="flex flex-col items-stretch gap-2">
          <h4 className="text-[14px] leading-[18.48px] text-black font-bold">
            Insurance Details:
          </h4>

          <Row>
            <span>Coverage:</span>
            <span>{coverage}</span>
          </Row>

          <Row>
            <span>Protected amount:</span>
            <span>{protectedAmount}</span>
          </Row>

          <Row>
            <span>Maximum loss:</span>
            <span>{maximumLoss}</span>
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
