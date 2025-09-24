import React from 'react';

const Rectangle: React.FC = () => {
  return (
    <svg
      width="663"
      height="301"
      viewBox="0 0 663 301"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto"
    >
      <g filter="url(#filter0_d_2_182)">
        <path
          d="M9 40.9369C9 21.1081 26.7807 5.97204 46.3842 8.95277C108.892 18.4571 237.059 36 331.5 36C425.941 36 554.108 18.4571 616.616 8.95278C636.219 5.97205 654 21.1081 654 40.9369V192C654 209.673 639.673 224 622 224H41C23.3269 224 9 209.673 9 192V40.9369Z"
          fill="url(#paint0_linear_2_182)"
        />
        <path
          d="M615.993 4.85547C638.079 1.49754 658.143 18.5454 658.144 40.9365V192C658.144 211.962 641.962 228.144 622 228.144H41C21.0382 228.144 4.85645 211.962 4.85645 192V40.9365C4.85666 18.5454 24.9211 1.49751 47.0068 4.85547C109.521 14.3608 237.407 31.8564 331.5 31.8564C425.593 31.8564 553.479 14.3608 615.993 4.85547Z"
          stroke="black"
          strokeWidth="8.28795"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2_182"
          x="0.712036"
          y="0.288086"
          width="661.576"
          height="300"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="68" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2_182"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2_182"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2_182"
          x1="331.5"
          y1="3"
          x2="331.5"
          y2="224"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFD5" />
          <stop offset="1" stopColor="#00BAFE" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Rectangle;
