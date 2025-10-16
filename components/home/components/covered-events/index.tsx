import CoveredEventCard from "./CoveredEventCard";

const events = [
  {
    title: "North Korea missile test by September 15?",
    coverPercent: 80,
    thumbnailUrl: "images/dummy_event.png",
    polymarketUrl: "https://polymarket.com/…",
  },
  {
    title: "North Korea missile test by September 15?",
    coverPercent: 50,
    thumbnailUrl: "images/dummy_event.png",
    polymarketUrl: "https://polymarket.com/…",
  },
  {
    title: "North Korea missile test by September 15?",
    coverPercent: 50,
    thumbnailUrl: "images/dummy_event.png",
    polymarketUrl: "https://polymarket.com/…",
  },
  {
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
