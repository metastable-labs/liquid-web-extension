/*
  Home.tsx

  Overview
  - This file renders the main home screen used by the extension. It contains
    three visual sections:
      1) Header area (logo, annotation, avatar)
      2) The tab/segmented controls which switch between "main" and
         "insurance" areas and between sub-groups inside "main"
      3) The scrolling content area which shows different screens using
         Framer Motion's AnimatePresence for animated transitions.

  Structure & flow (simple)
  - Top-level state is kept in this component using useState. The shape is:
      - tab: 'main' | 'insurance' (controlled from BottomTabs)
      - mainGroup: 'core' | 'event' (sub-group inside main tab)
      - core: 'overview' | 'covered' (pages inside main/core)
      - eventRoute: 'details' | 'transactions' (pages inside main/event)
      - insurance: 'open' | 'closed' (pages inside insurance tab)

  - AnimatePresence keying is derived from these state values so switching
    sub-screens triggers smooth transitions.

  Performance / optimization notes
  - Keep props passed to memoized child components stable to avoid needless
    re-renders. Specifically:
      * static SegmentedTabs item arrays are declared once (module-scope)
        and not recreated on every render.
      * frequently re-created inline handler functions were replaced by
        stable callbacks via useCallback where they are passed down to
        children or used as event handlers.
      * the small Block visual component is wrapped with React.memo since it's
        purely presentational and frequently used in lists.

*/

import { useMemo, useState, useCallback, memo, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Screen from "./components/Screen";
import HomeContext from "./HomeContext";
import Annotation from "../../src/assets/annotation";
import Logo from "../../src/assets/logo";
import BottomTabs from "./components/BottomTabs";
import SegmentedTabs from "./components/SegmentedTabs";
import type { BottomTab } from "./components/BottomTabs";
import ClickAnimation from "../ClickAnimation";
import Overview from "./components/overview";
import CoveredEvents from "./components/covered-events";
import EventDetails from "./components/event-details";
import OpenInsurance from "./components/insurance/OpenInsurance";
import ClosedInsurance from "./components/insurance/ClosedInsurance";
import ChevronRight from "../../src/assets/chevron-right";

type MainCoreScreen = "overview" | "covered";
type EventScreen = "details" | "transactions";

const Block = memo(({ h = 120 }: { h?: number }) => (
  <div
    className="rounded-2xl border border-slate-200 bg-white shadow-sm"
    style={{ height: h }}
  />
));

const MAIN_CORE_ITEMS = [
  { label: "Overview", value: "overview" as const },
  { label: "Covered events", value: "covered" as const },
];

const MAIN_EVENT_ITEMS = [
  { label: "Event details", value: "details" as const },
  { label: "Transactions", value: "transactions" as const },
];

const INSURANCE_ITEMS = [
  { label: "Open insurance", value: "open" as const },
  { label: "Closed insurance", value: "closed" as const },
];

export default function Home() {
  const [tab, setTab] = useState<BottomTab>("main");
  // MAIN tab state
  const [mainGroup, setMainGroup] = useState<"core" | "event">("core");
  const [core, setCore] = useState<MainCoreScreen>("overview");
  const [eventRoute, setEventRoute] = useState<EventScreen>("details");

  // INSURANCE tab state
  const [insurance, setInsurance] = useState<"open" | "closed">("open");

  const [activeEventId, setActiveEventId] = useState<string | null>(null);

  const handleTabChange = useCallback((t: BottomTab) => setTab(t), []);
  const handleBackToCore = useCallback(() => setMainGroup("core"), []);

  const ctxValue = useMemo(
    () => ({
      tab,
      setTab,
      mainGroup,
      setMainGroup,
      core,
      setCore,
      eventRoute,
      setEventRoute,
      insurance,
      setInsurance,
      activeEventId,
      setActiveEventId,
    }),
    [
      tab,
      setTab,
      mainGroup,
      setMainGroup,
      core,
      setCore,
      eventRoute,
      setEventRoute,
      insurance,
      setInsurance,
      activeEventId,
      setActiveEventId,
    ]
  );

  // Derived screen id for AnimatePresence keys
  const mainScreenId = useMemo(() => {
    return mainGroup === "core" ? `core-${core}` : `event-${eventRoute}`;
  }, [mainGroup, core, eventRoute]);

  const currentScreenKey =
    tab === "main" ? `main-${mainScreenId}` : `insurance-${insurance}`;

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf = 0;
    raf = requestAnimationFrame(() => {
      try {
        el.scrollTo({ top: 0, left: 0, behavior: "auto" });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        el.scrollTop = 0;
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [currentScreenKey]);

  return (
    <HomeContext.Provider value={ctxValue}>
      <div className="flex h-full select-none flex-col overflow-hidden bg-[#F8FAFC]">
        <div className="flex flex-col items-stretch gap-6 border-b border-b-slate-200 bg-white px-5 pb-3 pt-4">
          <header className="flex items-center justify-between">
            <Logo width={44.8} height={20} />
            <div className="flex items-center gap-4">
              <ClickAnimation>
                <Annotation />
              </ClickAnimation>
              <ClickAnimation>
                <img
                  src="images/avatar.png"
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                />
              </ClickAnimation>
            </div>
          </header>

          <div>
            {tab === "main" && (
              <>
                {mainGroup === "core" ? (
                  <SegmentedTabs
                    items={MAIN_CORE_ITEMS}
                    value={core}
                    onChange={setCore}
                  />
                ) : (
                  <SegmentedTabs
                    items={MAIN_EVENT_ITEMS}
                    value={eventRoute}
                    onChange={setEventRoute}
                  />
                )}
              </>
            )}

            {tab === "insurance" && (
              <SegmentedTabs
                items={INSURANCE_ITEMS}
                value={insurance}
                onChange={setInsurance}
              />
            )}
          </div>
        </div>

        <main className="relative w-full flex-1 overflow-hidden">
          <div
            ref={scrollRef}
            className="absolute inset-0 overflow-y-auto px-4 pt-4 pb-[88px] overscroll-y-contain scroll-smooth"
          >
            {tab === "main" && mainGroup === "event" && (
              <ClickAnimation
                onClick={handleBackToCore}
                className="border border-gray-300 rounded-full p-1 rotate-180 mb-4"
              >
                <ChevronRight />
              </ClickAnimation>
            )}

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentScreenKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {tab === "main" ? (
                  <Screen>
                    {mainGroup === "core" && (
                      <div className="space-y-3">
                        {core === "overview" && <Overview />}
                        {core === "covered" && <CoveredEvents />}
                      </div>
                    )}

                    {mainGroup === "event" && (
                      <div className="space-y-3">
                        {eventRoute === "details" && <EventDetails />}
                        {eventRoute === "transactions" && (
                          <div className="space-y-3">
                            <Block h={80} />
                            <Block h={80} />
                            <Block h={80} />
                          </div>
                        )}
                      </div>
                    )}
                  </Screen>
                ) : (
                  <Screen>
                    {insurance === "open" && <OpenInsurance />}
                    {insurance === "closed" && <ClosedInsurance />}
                  </Screen>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <BottomTabs active={tab} onChange={handleTabChange} />
      </div>
    </HomeContext.Provider>
  );
}
