import CoveredEventCard from "./CoveredEventCard";

type CoveredEventItem = {
  id: string;
  title: string;
  coverPercent: number;
  thumbnailUrl: string;
  polymarketUrl?: string;
};

const events: CoveredEventItem[] = [
  {
    id: "north-korea-missile-15-sep-1",
    title: "North Korea missile test by September 15?",
    coverPercent: 80,
    thumbnailUrl: "images/dummy_event.png",
    polymarketUrl: "https://polymarket.com/…",
  },
  {
    id: "north-korea-missile-15-sep-2",
    title: "North Korea missile test by September 15?",
    coverPercent: 50,
    thumbnailUrl: "images/dummy_event.png",
    polymarketUrl: "https://polymarket.com/…",
  },
  {
    id: "north-korea-missile-15-sep-3",
    title: "North Korea missile test by September 15?",
    coverPercent: 50,
    thumbnailUrl: "images/dummy_event.png",
    polymarketUrl: "https://polymarket.com/…",
  },
  {
    id: "north-korea-missile-15-sep-4",
    title: "North Korea missile test by September 15?",
    coverPercent: 50,
    thumbnailUrl: "images/dummy_event.png",
    polymarketUrl: "https://polymarket.com/…",
  },
];

export default function CoveredEvents() {
  return (
    <section className="rounded-2xl border border-[#EAEEF4] bg-white p-4 self-stretch flex flex-col items-stretch gap-2.5">
      {events.map((ev, i) => (
        <CoveredEventCard key={i} {...ev} />
      ))}
    </section>
  );
}
