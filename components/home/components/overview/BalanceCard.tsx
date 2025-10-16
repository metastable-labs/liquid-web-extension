import { useState } from "react";

import ChevronRight from "../../../../public/icons/chevron-right";
import ClickAnimation from "../../../ClickAnimation";
import { formatCurrency } from "../../../../utils/functions";

export default function BalanceCard() {
  const [balance, _setBalance] = useState(5234.56);

  const formatted = formatCurrency(balance, 2);

  const onDeposit = () => {};
  const onWithdraw = () => {};

  return (
    <div className="self-stretch flex flex-col items-stretch gap-4 rounded-2xl border border-[#EAEEF4] bg-white px-10 py-7">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <span className="text-xs text-[#64748B]">Balance</span>
        <div className="flex items-center justify-center gap-1">
          <span className="text-[28px] leading-[31.36px] font-bold text-[#020617] font-quanta">
            {formatted}
          </span>
          <ChevronRight />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full font-medium text-[13px] leading-[16.12px]">
        <ClickAnimation
          onClick={onDeposit}
          className="rounded-[14px] bg-[#0A0D12] px-4 py-2 text-white"
        >
          Deposit
        </ClickAnimation>

        <ClickAnimation
          onClick={onWithdraw}
          className="rounded-[14px] bg-[#F5F5F5] px-4 py-2 text-[#252B37]"
        >
          Withdraw
        </ClickAnimation>
      </div>
    </div>
  );
}
