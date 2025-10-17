const ExternalLink = ({
  width = 20,
  height = 20,
}: {
  width?: number;
  height?: number;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M7.01198 3.78583H6.14641C3.90534 3.78583 2.5 5.37135 2.5 7.61516V13.6708C2.5 15.9146 3.89847 17.5001 6.14641 17.5001H12.5776C14.8262 17.5001 16.2255 15.9146 16.2255 13.6708V11.5109"
      stroke="#717680"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.3674 6.92189C11.3865 6.92189 9.8528 7.60724 9.00464 9.48025C9.00464 9.48025 8.27137 4.33962 13.3674 4.33962C13.3674 4.33962 13.3678 3.58198 13.3683 2.92996C13.3688 2.56428 13.7974 2.36619 14.0766 2.60277L17.3466 5.37282C17.5447 5.54087 17.5518 5.84364 17.3584 6.01827C16.6401 6.66794 15.0249 8.12782 14.0841 8.97792C13.8077 9.22767 13.3674 9.03008 13.3674 8.65733V6.92189Z"
      stroke="#717680"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default ExternalLink;
