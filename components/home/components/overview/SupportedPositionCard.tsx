import classNames from "classnames";
import ChevronRight from "../../../../src/assets/chevron-right";

type BaseProps = {
  title: string;
  thumbnailUrl: string;
  outcome: "Yes" | "No";
  actionText: string;
  onAction?: () => void;
};

type PositionRowProps = BaseProps & {
  variant: "position";
  totalValue: string;
};

type EventRowProps = BaseProps & {
  variant: "event";
  sharesText: string;
  pnlText: string;
  timeAgo: string;
};

export type SupportedPositionCardProps = PositionRowProps | EventRowProps;

export default function SupportedPositionCard(
  props: SupportedPositionCardProps
) {
  const { title, thumbnailUrl, outcome, actionText, onAction } = props;

  return (
    <div className="rounded-2xl border border-[#EAEEF4] bg-white shadow-sm">
      <div className="flex items-start gap-3 p-4">
        <img
          src={thumbnailUrl}
          alt={title}
          className="size-9 rounded-xl object-cover"
        />
        <p className="text-[14px] font-bold leading-[18.48px] text-[#334155]">
          {title}
        </p>
      </div>

      <div className="border-t border-dashed border-[#E2E8F0] mx-4" />

      {props.variant === "position" ? (
        <div className="flex flex-col gap-2 p-4 font-medium">
          <div className="flex items-center justify-between">
            <span className="text-[12px] leading-[14.88px] text-[#64748B]">
              Position outcome
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
              Total position value
            </span>
            <span className="text-[12px] leading-[14.88px] text-[#64748B]">
              {props.totalValue}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-4 font-medium">
          <div className="flex items-center justify-between">
            <span
              className={classNames(
                "rounded-md px-1.5 py-0.5 text-xs text-white",
                outcome === "Yes" && "bg-[#17B26A]",
                outcome === "No" && "bg-[#EF4444]"
              )}
            >
              {outcome}
            </span>

            <span className="text-[14px] leading-[18.48px] text-[#334155] font-bold">
              {props.pnlText}
            </span>
          </div>

          <div className="flex items-center justify-between font-medium">
            <span className="text-[12px] leading-[14.88px] text-[#64748B]">
              {props.sharesText}
            </span>
            <span className="text-[12px] leading-[14.88px] text-[#64748B]">
              {props.timeAgo}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={onAction}
        className="flex w-full items-center justify-center gap-1 rounded-b-[14px] border-t border-[#EAEEF4] bg-[#EAEEF4] px-4 py-3 text-[12px] leading-[14.88px] font-bold text-[#475569]"
      >
        {actionText}
        <ChevronRight width={12} height={12} />
      </button>
    </div>
  );
}
