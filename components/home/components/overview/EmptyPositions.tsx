export default function EmptyPositions() {
  return (
    <div className="rounded-2xl border border-[#CBD5E1] border-dashed bg-white px-[31px] py-[70px] text-center flex flex-col items-center justify-center gap-[21.69px]">
      <img
        src="empty-positions.png"
        alt="Empty positions"
        className="h-[59.66px] w-[146px]"
      />
      <p className="max-w-[22ch] text-[13px] leading-[19.5px] text-[#717680]">
        Liquid supported positions on Polymarket will appear here
      </p>
    </div>
  );
}
