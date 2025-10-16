import InsuranceCard, { type InsuranceCardProps } from "./InsuranceCard";

const openPolicies: InsuranceCardProps[] = [
  {
    title: "Russia and Ukraine ceasefire in 2025?",
    thumbnailUrl: "images/dummy_event.png",
    outcome: "Yes",
    insuredPercent: 35,
    premiumUsd: 75,
    totalValueUsd: 5200,
    status: "Active",
  },
];

export default function OpenInsurance() {
  return (
    <section className="rounded-2xl border border-[#EAEEF4] bg-white p-4 self-stretch flex flex-col items-stretch gap-2.5">
      {openPolicies.map((p, i) => (
        <InsuranceCard key={i} {...p} />
      ))}
    </section>
  );
}
