import InsuranceCard, { type InsuranceCardProps } from "./InsuranceCard";

const closedPolicies: InsuranceCardProps[] = [
  {
    title: "Will BTC close above $100k in 2025?",
    thumbnailUrl: "images/dummy_event.png",
    outcome: "No",
    insuredPercent: 20,
    premiumUsd: 40,
    totalValueUsd: 1800,
    status: "Expired",
  },
  {
    title: "North Korea missile test by September 15?",
    thumbnailUrl: "images/dummy_event.png",
    outcome: "Yes",
    insuredPercent: 50,
    premiumUsd: 120,
    totalValueUsd: 3400,
    status: "Paid out",
  },
];

export default function ClosedInsurance() {
  return (
    <section className="rounded-2xl border border-[#EAEEF4] bg-white p-4 self-stretch flex flex-col items-stretch gap-2.5">
      {closedPolicies.map((p, i) => (
        <InsuranceCard key={i} {...p} />
      ))}
    </section>
  );
}
