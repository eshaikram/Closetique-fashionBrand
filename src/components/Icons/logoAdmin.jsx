import React from 'react';

const LogoAdmin = () => (
  <svg 
    width="100%"
    height="auto"
    viewBox="0 0 220 70" // Maintain original proportions
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px] mt-2" // Responsive widths
    preserveAspectRatio="xMidYMid meet" // Ensure proper scaling
  >
    <defs>
      <linearGradient id="eGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF4500" />
        <stop offset="100%" stopColor="#FF6A00" />
      </linearGradient>
    </defs>

    {/* Background Rectangle */}
    <rect
      x="0"
      y="0"
      width="220"
      height="70"
      fill="#fff" // Black background; you can change the color as needed
      rx="10" // Optional: rounded corners
    />

    <g>
      <path 
        d="
          M20 10 
          H40 
          V15 
          H25 
          V25 
          H38 
          V30 
          H25 
          V40 
          H40 
          V45 
          H20 
          Z"
        fill="url(#eGradient)"
      />

      <text 
        x="55" 
        y="30" 
        fontSize="28" 
        fontFamily="'Segoe UI', sans-serif" 
        fill="#000" 
        textAnchor="start" 
        letterSpacing="1"
      >
        Closetique
      </text>

      <text 
        x="67" 
        y="50" 
        fontSize="14" 
        fontFamily="'Segoe UI', sans-serif" 
        fill="#FF4500" 
        letterSpacing="2"
      >
        STYLE HOUSE
      </text>
    </g>
  </svg>
);

export default LogoAdmin;