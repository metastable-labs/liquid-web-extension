import { ActiveHome, InactiveHome } from "../../../src/assets/home";
import {
  ActiveShieldLock,
  InactiveShieldLock,
} from "../../../src/assets/shield-lock";

export type BottomTab = "main" | "insurance";

const BottomTabs = ({
  active,
  onChange,
}: {
  active: BottomTab;
  onChange: (t: BottomTab) => void;
}) => {
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-20 h-[72px] border-t border-t-slate-200 bg-white backdrop-blur">
      <div className="mx-auto grid grid-cols-2">
        <button
          className={`flex flex-col items-center gap-0.5 py-3 ${
            active === "main" ? "text-[#020617]" : "text-[#94A3B8]"
          }`}
          onClick={() => onChange("main")}
          aria-current={active === "main" ? "page" : undefined}
        >
          {active === "main" ? <ActiveHome /> : <InactiveHome />}
          <span className="text-[11px] font-medium">Main</span>
        </button>
        <button
          className={`flex flex-col items-center gap-0.5 py-3 ${
            active === "insurance" ? "text-[#020617]" : "text-[#94A3B8]"
          }`}
          onClick={() => onChange("insurance")}
          aria-current={active === "insurance" ? "page" : undefined}
        >
          {active === "insurance" ? (
            <ActiveShieldLock />
          ) : (
            <InactiveShieldLock />
          )}
          <span className="text-[11px] font-medium">My insurance</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomTabs;
