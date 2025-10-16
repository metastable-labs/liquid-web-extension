import classNames from "classnames";
import { formatCurrency } from "../../../../utils/functions";

type InsuranceStatus =
  | "Active"
  | "Pending"
  | "Expired"
  | "Paid out"
  | "Cancelled";

export type InsuranceCardProps = {
  title: string;
  thumbnailUrl: string;
  outcome: "Yes" | "No";
  insuredPercent: number;
  premiumUsd: number;
  totalValueUsd: number;
  status: InsuranceStatus;
  className?: string;
};

const statusColor: Record<InsuranceStatus, string> = {
  Active: "#09C37F",
  Pending: "#F59E0B",
  "Paid out": "#16A34A",
  Expired: "#64748B",
  Cancelled: "#F04438",
};

export default function InsuranceCard({
  title,
  thumbnailUrl,
  outcome,
  insuredPercent,
  premiumUsd,
  totalValueUsd,
  status,
  className,
}: InsuranceCardProps) {
  return (
    <section
      className={`rounded-2xl border border-[#EAEEF4] bg-white p-4 ${
        className ?? ""
      }`}
    >
      <div className="flex items-start gap-3">
        <img
          src={thumbnailUrl}
          alt={title}
          className="size-9 rounded-xl object-cover"
        />
        <p className="text-[14px] font-bold leading-[18.48px] text-[#334155]">
          {title}
        </p>
      </div>

      <div className="my-3 border-t border-dashed border-[#E2E8F0]" />

      <div className="flex flex-col gap-2 font-medium">
        <div className="flex items-center justify-between">
          <span className="text-[12px] leading-[14.88px] text-[#64748B]">
            Position
          </span>
          <span
            className={classNames(
              "rounded-md px-1.5 py-0.5 text-xs text-white",
              outcome === "Yes" && "bg-[#17B26A]",
              outcome === "No" && "bg-[#EF4444]"
            )}
          >
            {outcome}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[12px] leading-[14.88px] text-[#64748B]">
            Insured
          </span>
          <span className="text-[12px] leading-[14.88px] text-[#64748B]">
            {insuredPercent}% ({formatCurrency(premiumUsd)})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[12px] leading-[14.88px] text-[#64748B]">
            Total position value
          </span>
          <span className="text-[12px] leading-[14.88px] text-[#64748B]">
            {formatCurrency(totalValueUsd)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[12px] leading-[14.88px] text-[#64748B]">
            Insurance status
          </span>
          <span
            className="text-[12px] leading-[14.88px]"
            style={{ color: statusColor[status] }}
          >
            {status}
          </span>
        </div>
      </div>
    </section>
  );
}
