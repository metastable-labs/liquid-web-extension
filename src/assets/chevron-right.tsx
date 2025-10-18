const ChevronRight = ({
  width = 16,
  height = 16,
}: {
  width?: number;
  height?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M6 12L10 8L6 4"
      stroke="#94A3B8"
      stroke-width="1.33333"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default ChevronRight;
