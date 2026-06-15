import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', centered = false }) => {
  // Define precise dimensions and layout configurations for different sizes to keep the proportions ultra-cool and compact
  // We use generous negative starting values in the viewBox (min-x, min-y) to act as a buffer for the cursive slants and thick outlines
  const layout = {
    sm: {
      svgClass: "w-36 h-18",
      viewBox: "-30 -30 480 260",
      mzY: "115",
      mzSize: "105px",
      ltX: "115",
      ltY: "185",
      ltSize: "90px",
      stroke: "12"
    },
    md: {
      svgClass: "w-52 h-26",
      viewBox: "-40 -40 540 300",
      mzY: "125",
      mzSize: "120px",
      ltX: "135",
      ltY: "200",
      ltSize: "105px",
      stroke: "14"
    },
    lg: {
      svgClass: "w-72 h-36",
      viewBox: "-50 -50 600 340",
      mzY: "135",
      mzSize: "135px",
      ltX: "155",
      ltY: "220",
      ltSize: "120px",
      stroke: "16"
    },
    xl: {
      svgClass: "w-[280px] sm:w-[420px] md:w-[490px] h-auto",
      viewBox: "-60 -60 660 380",
      mzY: "145",
      mzSize: "160px",
      ltX: "175",
      ltY: "245",
      ltSize: "140px",
      stroke: "18"
    }
  }[size];

  return (
    <div className={`select-none ${centered ? 'mx-auto flex justify-center' : 'inline-block'}`}>
      <svg
        viewBox={layout.viewBox}
        className={`${layout.svgClass} h-auto filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)] md:drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)]`}
        style={{ overflow: 'visible' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Mz.B - bright sky blue to beautiful lavender and clean neon green */}
          <linearGradient id="mzGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4fc2ff" />
            <stop offset="50%" stopColor="#bf9ef4" />
            <stop offset="100%" stopColor="#4eed8c" />
          </linearGradient>

          {/* Lt.6 - high-contrast hot pink to orange-yellow glow */}
          <linearGradient id="ltGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff7da2" />
            <stop offset="55%" stopColor="#ffaa6a" />
            <stop offset="100%" stopColor="#f4e253" />
          </linearGradient>
        </defs>

        {/* Render "Mz.B" */}
        <text
          x="15"
          y={layout.mzY}
          fill="url(#mzGradient)"
          stroke="#000000"
          strokeWidth={layout.stroke}
          strokeLinejoin="round"
          strokeLinecap="round"
          paintOrder="stroke"
          style={{ fontFamily: "'Satisfy', cursive" }}
          className="font-semibold italic tracking-normal"
          fontSize={layout.mzSize}
        >
          Mz.B
        </text>

        {/* Render "Lt.6" */}
        <text
          x={layout.ltX}
          y={layout.ltY}
          fill="url(#ltGradient)"
          stroke="#000000"
          strokeWidth={layout.stroke}
          strokeLinejoin="round"
          strokeLinecap="round"
          paintOrder="stroke"
          style={{ fontFamily: "'Satisfy', cursive" }}
          className="font-semibold italic tracking-normal"
          fontSize={layout.ltSize}
        >
          Lt.6
        </text>
      </svg>
    </div>
  );
};
