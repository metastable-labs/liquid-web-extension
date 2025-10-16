import BalanceCard from "./BalanceCard";
import EmptyPositions from "./EmptyPositions";
import CoveredEventCard from "../covered-events/CoveredEventCard";
import SupportedPositionCard, {
  type SupportedPositionCardProps,
} from "./SupportedPositionCard";

const coveredEvents = [
  {
    title: "North Korea missile test by September 15?",
    coverPercent: 80,
    thumbnailUrl: "images/dummy_event.png",
    polymarketUrl: "https://polymarket.com/…",
  },
  {
    title: "Will AI pass the Turing test by 2025?",
    coverPercent: 65,
    thumbnailUrl: "images/dummy_event.png",
    polymarketUrl: "https://polymarket.com/…",
  },
];

const supportedPositions: SupportedPositionCardProps[] = [
  {
    variant: "position",
    title: "Russia and Ukraine ceasefire in 2025?",
    thumbnailUrl: "images/dummy_event.png",
    outcome: "Yes",
    totalValue: "$5,200",
    actionText: "Insure position",
    onAction: () => {},
  },
  {
    variant: "event",
    title: "Russia and Ukraine ceasefire in 2025?",
    thumbnailUrl: "images/dummy_event.png",
    outcome: "Yes",
    sharesText: "Bought 190 Shares",
    pnlText: "+$123.43",
    timeAgo: "28d ago",
    actionText: "Insure event",
    onAction: () => {},
  },
];

export default function Overview() {
  const hasSupported = supportedPositions.length > 0;

  return (
    <div className="space-y-4">
      <BalanceCard />

      {hasSupported ? (
        <section className="rounded-2xl border border-[#EAEEF4] bg-white p-4 self-stretch flex flex-col items-stretch gap-2.5">
          <h3 className="text-[12px] font-semibold text-[#334155] pb-2 border-b border-[#F1F5F9]">
            Supported open positions
          </h3>

          {supportedPositions.map((p, i) => (
            <SupportedPositionCard key={i} {...p} />
          ))}
        </section>
      ) : (
        <EmptyPositions />
      )}

      <section className="rounded-2xl border border-[#EAEEF4] bg-white p-4 self-stretch flex flex-col items-stretch gap-2.5">
        <h3 className="text-[12px] font-semibold text-[#334155] pb-2 border-b border-[#F1F5F9]">
          Covered events
        </h3>

        {coveredEvents.map((ev, i) => (
          <CoveredEventCard key={i} {...ev} />
        ))}
      </section>
    </div>
  );
}
