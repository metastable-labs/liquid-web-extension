import { useCallback } from "react";

import { useHome } from "../../HomeContext";
import ExternalLink from "../../../../src/assets/ExternalLink";
import ClickAnimation from "../../../ClickAnimation";

export type CoveredEvent = {
  id: string;
  title: string;
  coverPercent: number;
  thumbnailUrl: string;
  polymarketUrl?: string;
};

export default function CoveredEventCard({
  id,
  title,
  coverPercent,
  thumbnailUrl,
  polymarketUrl,
}: CoveredEvent) {
  const { setMainGroup, setEventRoute, setActiveEventId } = useHome();

  const goToEvent = useCallback(() => {
    setActiveEventId(id);
    setMainGroup("event");
    setEventRoute("details");
  }, [id, setActiveEventId, setMainGroup, setEventRoute]);
  return (
    <div
      onClick={goToEvent}
      className="rounded-2xl border border-[#EAEEF4] bg-[#FCFCFD]"
    >
      <div className="flex items-start gap-3 p-4">
        <img
          src={thumbnailUrl}
          alt={title}
          className="size-10 rounded-[13.333px] object-cover"
        />
        <p className="text-[14px] font-medium leading-[17.36px] text-[#020617]">
          {title}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#EAEEF4] px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="text-[12px] leading-[14.88px] text-[#535862]">
            Coverage
          </span>
          <span className="rounded-lg bg-[#F5F5F5] px-1.5 py-0.5 text-xs font-medium text-[#535862]">
            {coverPercent}%
          </span>
        </div>

        <ClickAnimation stopPropagation>
          <a
            href={polymarketUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[12px] leading-[14.88px] text-[#535862] hover:underline"
          >
            Open on Polymarket
            <ExternalLink />
          </a>
        </ClickAnimation>
      </div>
    </div>
  );
}
