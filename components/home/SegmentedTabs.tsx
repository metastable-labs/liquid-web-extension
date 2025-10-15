import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function SegmentedTabs<T extends string>({
  items,
  value,
  onChange,
}: {
  items: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const prefersReduce = useReducedMotion();

  return (
    <div className="relative inline-flex items-center gap-3" role="tablist">
      {items.map((it) => {
        const active = value === it.value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(it.value)}
            className={`relative rounded-xl px-3 py-2 text-[14px] ${
              active ? "font-semibold" : "font-normal"
            }`}
          >
            <AnimatePresence initial={false}>
              {active && (
                <motion.span
                  layoutId="seg-bg"
                  className="absolute inset-0 rounded-xl bg-[#F1F5F9]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={
                    prefersReduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 320, damping: 28 }
                  }
                />
              )}
            </AnimatePresence>

            <span className="relative z-10 text-[#334155]">{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedTabs;
