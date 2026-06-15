import React from 'react';
import { motion } from 'motion/react';

interface ShirtMockupProps {
  productId: string;
  side: 'front' | 'back';
  className?: string;
}

export const ShirtMockup: React.FC<ShirtMockupProps> = ({ productId, side, className = '' }) => {
  // Map product IDs to base fabric colors and designs.
  const getShirtConfig = (id: string) => {
    switch (id) {
      case 'mzb-calle-todo':
        return {
          bg: '#1e3026', // Deep forest/moss wash green
          washEffect: 'moss-wash',
          stitching: '#2b4435'
        };
      case 'mzb-buen-dia':
        return {
          bg: '#242526', // Charcoal dark wash
          washEffect: 'charcoal-wash',
          stitching: '#121213'
        };
      case 'mzb-humanidad':
        return {
          bg: '#414449', // Slate grey
          washEffect: 'slate-wash',
          stitching: '#2d3034'
        };
      case 'mzb-riqueza-vida':
        return {
          bg: '#121212', // Pure deep graphite/black
          washEffect: 'none',
          stitching: '#1b1b1b'
        };
      case 'mzb-classic-signature':
      default:
        return {
          bg: '#f5f4ef', // Beautiful off-white
          washEffect: 'none',
          stitching: '#e6e4dc'
        };
    }
  };

  const config = getShirtConfig(productId);

  return (
    <div className={`relative flex items-center justify-center w-full aspect-square bg-[#0f1115]/30 rounded-2xl overflow-hidden shadow-inner p-4 border border-zinc-800/20 group ${className}`}>
      
      {/* Absolute Background Street Grid Layout */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Ambient background glow matching the shirt's theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: productId === 'mzb-calle-todo' ? 'rgba(74, 222, 128, 0.3)' :
                      productId === 'mzb-buen-dia' ? 'rgba(239, 68, 68, 0.3)' :
                      productId === 'mzb-humanidad' ? 'rgba(99, 102, 241, 0.3)' :
                      productId === 'mzb-riqueza-vida' ? 'rgba(245, 158, 11, 0.3)' :
                      'rgba(244, 244, 245, 0.2)'
        }}
      />

      <svg
        viewBox="0 0 500 500"
        className="w-full h-full max-w-[340px] drop-shadow-[0_25px_25px_rgba(0,0,0,0.65)] select-none"
      >
        <defs>
          {/* Logo Brand Gradient - Recreated matching the actual logo perfectly */}
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5fc1ff" /> {/* Light blue */}
            <stop offset="35%" stopColor="#ff7da2" /> {/* Coral Pink */}
            <stop offset="70%" stopColor="#6ae29a" /> {/* Mint-Green */}
            <stop offset="100%" stopColor="#f2ea5b" /> {/* Sunshine Yellow */}
          </linearGradient>

          {/* Graffiti secondary gradients */}
          <linearGradient id="neonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff4591" />
            <stop offset="100%" stopColor="#ffbd59" />
          </linearGradient>

          <linearGradient id="slimeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a3ff12" />
            <stop offset="100%" stopColor="#00ffcc" />
          </linearGradient>

          {/* Mock fabric texture - Turbulance simulation */}
          <filter id="fabricNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 .5   0 0 0 0 .5   0 0 0 0 .5  0.07 0 0 0 0" />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>

          {/* Washed texture simulation */}
          <filter id="washTexture" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="3" result="rough" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.22 0" result="roughAlpha" />
            <feBlend mode="overlay" in="SourceGraphic" in2="roughAlpha" />
          </filter>

          {/* Shirt flat lay shadow */}
          <filter id="innerShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset dx="0" dy="3"/>
            <feGaussianBlur stdDeviation="4" result="offset-blur"/>
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
            <feFlood floodColor="black" floodOpacity="0.4" result="color"/>
            <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
            <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
          </filter>

          {/* T-Shirt Clip Path for Graphics */}
          <clipPath id="shirtClip">
            <path d="M 250 50 C 220 50 205 60 190 70 C 180 75 160 85 130 95 C 105 103 84 115 76 130 C 72 138 78 152 82 170 C 88 190 98 220 102 230 C 105 238 111 236 122 225 L 145 200 C 145 210 148 275 152 320 C 158 390 159 445 160 460 C 160 468 170 470 250 470 C 330 470 340 468 340 460 C 341 445 342 390 348 320 C 352 275 355 210 355 200 L 378 225 C 389 236 395 238 398 230 C 402 220 412 190 418 170 C 422 152 428 138 424 130 C 416 115 395 103 370 95 C 340 85 320 75 310 70 C 295 60 280 50 250 50 Z" />
          </clipPath>
        </defs>

        {/* --- MAIN T-SHIRT BODY SHAPE --- */}
        <g filter="url(#innerShadow)">
          {/* Base Fabric */}
          <path
            d="M 250 50 C 220 50 205 60 190 70 C 180 75 160 85 130 95 C 105 103 84 115 76 130 C 72 138 78 152 82 170 C 88 190 98 220 102 230 C 105 238 111 236 122 225 L 145 200 C 145 210 148 275 152 320 C 158 390 159 445 160 460 C 160 468 170 470 250 470 C 330 470 340 468 340 460 C 341 445 342 390 348 320 C 352 275 355 210 355 200 L 378 225 C 389 236 395 238 398 230 C 402 220 412 190 418 170 C 422 152 428 138 424 130 C 416 115 395 103 370 95 C 340 85 320 75 310 70 C 295 60 280 50 250 50 Z"
            fill={config.bg}
            stroke={config.stitching}
            strokeWidth="3.5"
          />

          {/* Fabric Washes / Grunges overlay filter */}
          {config.washEffect !== 'none' && (
            <path
              d="M 250 50 C 220 50 205 60 190 70 C 180 75 160 85 130 95 C 105 103 84 115 76 130 C 72 138 78 152 82 170 C 88 190 98 220 102 230 C 105 238 111 236 122 225 L 145 200 C 145 210 148 275 152 320 C 158 390 159 445 160 460 C 160 468 170 470 250 470 C 330 470 340 468 340 460 C 341 445 342 390 348 320 C 352 275 355 210 355 200 L 378 225 C 389 236 395 238 398 230 C 402 220 412 190 418 170 C 422 152 428 138 424 130 C 416 115 395 103 370 95 C 340 85 320 75 310 70 C 295 60 280 50 250 50 Z"
              fill={config.bg}
              filter="url(#washTexture)"
              opacity="0.85"
              clipPath="url(#shirtClip)"
              className="pointer-events-none mix-blend-overlay"
            />
          )}

          {/* Cotton micro-texture */}
          <path
            d="M 250 50 C 220 50 205 60 190 70 L 418 170 Z"
            fill={config.bg}
            filter="url(#fabricNoise)"
            clipPath="url(#shirtClip)"
            opacity="0.9"
            className="pointer-events-none mix-blend-multiply"
          />

          {/* Ribbed Street-Style Crewneck */}
          <path
            d="M 190 70 C 190 70 215 95 250 95 C 285 95 310 70 310 70 C 300 63 285 58 250 58 C 215 58 200 63 190 70 Z"
            fill={config.bg}
            stroke={config.stitching}
            strokeWidth="3.5"
          />
          {/* Collar inner shadow tag */}
          <path
            d="M 194 68 C 210 88 250 88 306 68 C 295 62 275 58 250 58 C 225 58 205 62 194 68 Z"
            fill="#090a0c"
            opacity="0.4"
          />

          {/* --- BRAND GRAPHIC OVERLAYS --- */}
          <g clipPath="url(#shirtClip)">

            {/* PRODUCT ID: DE LA CALLE NACE TODO */}
            {productId === 'mzb-calle-todo' && (
              <g>
                {/* Background spray spots */}
                <circle cx="250" cy="270" r="110" fill="url(#slimeGrad)" opacity="0.12" filter="blur(15px)" />
                <circle cx="180" cy="310" r="60" fill="url(#logoGrad)" opacity="0.18" filter="blur(10px)" />
                <circle cx="310" cy="220" r="50" fill="#ff4591" opacity="0.15" filter="blur(12px)" />

                {/* Street vendors center conceptual illustration with silhouettes */}
                <g opacity="0.85">
                  {/* Cart silhouette */}
                  <rect x="170" y="270" width="160" height="70" fill="#0c1410" rx="4" />
                  {/* Cart wheels */}
                  <circle cx="200" cy="345" r="15" fill="#0d1f14" stroke="#4ade80" strokeWidth="2" />
                  <circle cx="300" cy="345" r="15" fill="#0d1f14" stroke="#4ade80" strokeWidth="2" />
                  {/* Cartoon items in cart (Boxes, small items stacked) */}
                  <rect x="180" y="235" width="25" height="35" fill="#1b2e23" stroke="#6ae29a" strokeWidth="1.5" />
                  <rect x="208" y="220" width="35" height="50" fill="#2d4435" stroke="#f2ea5b" strokeWidth="1.5" />
                  <rect x="246" y="240" width="30" height="30" fill="#1e3026" stroke="#5fc1ff" strokeWidth="1.5" />
                  <rect x="280" y="225" width="40" height="45" fill="#2d4435" stroke="#ff7da2" strokeWidth="1.5" />

                  {/* Little helper silhouettes standing next to cart */}
                  <circle cx="155" cy="265" r="10" fill="#090d0b" />
                  <path d="M 145 275 L 165 275 C 165 275 168 310 155 310 C 142 310 145 275 145 275 Z" fill="#090d0b" />

                  <circle cx="345" cy="275" r="9" fill="#090d0b" />
                  <path d="M 336 284 L 354 284 L 350 315 L 340 315 Z" fill="#090d0b" />
                </g>

                {/* Big graffiti tag text */}
                <g transform="translate(250, 160)" textAnchor="middle">
                  <text y="-25" fontFamily="impact, Impact, sans-serif" fontSize="24" fill="#ffffff" letterSpacing="1" stroke="#000000" strokeWidth="2">DE LA CALLE</text>
                  <text y="0" fontFamily="impact, Impact, sans-serif" fontSize="28" fill="url(#logoGrad)" letterSpacing="1.5" stroke="#000000" strokeWidth="2.5">NACE TODO</text>
                </g>

                {/* Subtext slogans inside the green tee */}
                <g transform="translate(250, 395)" textAnchor="middle">
                  <text y="0" fontFamily="monospace, Courier" fontSize="9" fill="#f2ea5b" fontWeight="bold">NO ES POBREZA, ES LUCHA</text>
                  <text y="14" fontFamily="sans-serif" fontSize="7" fill="#6ae29a" fontWeight="bold" letterSpacing="0.5">PEQUEÑOS VENDEDORES GRANDES SUEÑOS</text>
                  <text y="26" fontFamily="sans-serif" fontSize="7.5" fill="#ffffff" fontWeight="normal" opacity="0.7">MZ.B LT.6 STREETWEAR ©</text>
                </g>

                {/* Sprayed Crowns, Crosses and Stars around */}
                {/* Crown top left */}
                <path d="M 115 152 L 120 142 L 125 150 L 130 141 L 135 152 Z" fill="none" stroke="#6ae29a" strokeWidth="2.5" />
                {/* Star top right */}
                <path d="M 370 145 L 375 150 L 382 148 L 378 155 L 383 161 L 376 160 L 372 166 L 370 159 L 364 157 L 370 153 Z" fill="#ff7da2" />
                {/* Big street spray cross */}
                <line x1="120" y1="380" x2="140" y2="400" stroke="#f2ea5b" strokeWidth="4" strokeLinecap="round" />
                <line x1="140" y1="380" x2="120" y2="400" stroke="#f2ea5b" strokeWidth="4" strokeLinecap="round" />

                <line x1="360" y1="370" x2="375" y2="385" stroke="#5fc1ff" strokeWidth="3" strokeLinecap="round" />
                <line x1="375" y1="370" x2="360" y2="385" stroke="#5fc1ff" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}

            {/* PRODUCT ID: BUEN DIA / VOODOO DOLL / UFO */}
            {productId === 'mzb-buen-dia' && (
              <g>
                {side === 'front' ? (
                  /* FRONT OF BUEN DIA (Stitched doll with crown and red spray heart) */
                  <g>
                    {/* Spray glow back */}
                    <circle cx="250" cy="270" r="90" fill="#ff4c4c" opacity="0.14" filter="blur(20px)" />

                    {/* Left breast embroidery brand signet */}
                    <g transform="translate(145, 125)" opacity="0.9">
                      <rect x="0" y="0" width="30" height="20" fill="#090a0c" rx="3" />
                      <text x="15" y="14" fontFamily="monospace" fontSize="8" fill="url(#logoGrad)" textAnchor="middle" fontWeight="bold">MZB</text>
                    </g>

                    {/* Center: Voodoo Stitched Doll */}
                    <g id="voodoo-doll" transform="translate(250, 275)">
                      {/* Body contour */}
                      {/* Head */}
                      <circle cx="0" cy="-60" r="34" fill="#3a3835" stroke="#121213" strokeWidth="3" />
                      {/* Button eyes */}
                      <circle cx="-13" cy="-64" r="7" fill="#ffffff" stroke="#121213" strokeWidth="1.5" />
                      <line x1="-17" y1="-68" x2="-9" y2="-60" stroke="#ff4c4c" strokeWidth="2.5" />
                      <line x1="-9" y1="-68" x2="-17" y2="-60" stroke="#ff4c4c" strokeWidth="2.5" />

                      <circle cx="13" cy="-60" r="8" fill="#f5ea5d" stroke="#121213" strokeWidth="1.5" />
                      <text x="13" y="-56" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#000000">X</text>

                      {/* Stitched smile mouth */}
                      <path d="M -18 -42 C -10 -35 10 -35 18 -42" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
                      <line x1="-12" y1="-44" x2="-10" y2="-36" stroke="#121213" strokeWidth="2" />
                      <line x1="-1" y1="-41" x2="-1" y2="-33" stroke="#121213" strokeWidth="2" />
                      <line x1="10" y1="-44" x2="8" y2="-36" stroke="#121213" strokeWidth="2" />

                      {/* Body torso */}
                      <path d="M -16 -26 C -25 20 -20 40 -12 60 L 12 60 C 20 40 25 20 16 -26 Z" fill="#3a3835" stroke="#121213" strokeWidth="3" />

                      {/* Red spray painted heart on chest */}
                      <path d="M 0 -10 C -12 -25 -25 -5 -1 15 C 23 -5 10 -25 0 -10 Z" fill="#ff2e2e" opacity="0.8" transform="scale(0.8) translate(0, -6)" />

                      {/* Yarn stitches across limbs */}
                      {/* Left Arm */}
                      <path d="M -18 -15 C -45 -18 -55 -10 -55 -5 C -55 5 -40 2 -18 -4" fill="#3a3835" stroke="#121213" strokeWidth="3" />
                      {/* Right Arm */}
                      <path d="M 18 -15 C 45 -18 55 -10 55 -5 C 55 5 40 2 18 -4" fill="#3a3835" stroke="#121213" strokeWidth="3" />
                      {/* Legs */}
                      <rect x="-24" y="58" width="16" height="30" fill="#3a3835" stroke="#121213" strokeWidth="3" rx="4" />
                      <rect x="8" y="58" width="16" height="30" fill="#3a3835" stroke="#121213" strokeWidth="3" rx="4" />

                      {/* Scribbled brand name below doll */}
                      <g transform="translate(0, 115)" textAnchor="middle">
                        <text x="0" y="0" fontFamily="sans-serif" fontSize="13" fontWeight="900" fill="#ffffff" letterSpacing="3">Mz.B Lt.6</text>
                        <path d="M -45 8 C 0 15 25 2 45 4" fill="none" stroke="#ff2e2e" strokeWidth="3.5" strokeLinecap="round" />
                      </g>
                    </g>
                  </g>
                ) : (
                  /* BACK OF BUEN DIA (Retro green UFO and deep statement) */
                  <g>
                    <circle cx="250" cy="240" r="110" fill="#3df580" opacity="0.1" filter="blur(25px)" />

                    {/* Beam of light from ship */}
                    <polygon points="250,170 170,360 330,360" fill="url(#slimeGrad)" opacity="0.3" />

                    {/* Retro television abducting */}
                    <g transform="translate(250, 310)" opacity="0.85">
                      <rect x="-24" y="-18" width="48" height="36" fill="#15171a" stroke="#a3ff12" strokeWidth="2" rx="3" />
                      <rect x="-18" y="-12" width="30" height="24" fill="#3df580" opacity="0.6" rx="1" />
                      {/* TV Antenna */}
                      <line x1="-10" y1="-26" x2="0" y2="-18" stroke="#ffffff" strokeWidth="2" />
                      <line x1="10" y1="-26" x2="0" y2="-18" stroke="#ffffff" strokeWidth="2" />
                      {/* Static lightning symbol inside TV */}
                      <polyline points="-6,0 4,-6 -2,6 8,0" fill="none" stroke="#ffffff" strokeWidth="2" />
                    </g>

                    {/* Alien Spaceship UFO shape */}
                    <g transform="translate(250, 160)">
                      {/* Flying saucer dome */}
                      <path d="M-25,-5 C-25,-32 25,-32 25,-5 Z" fill="#6dfac5" stroke="#000000" strokeWidth="3" />
                      {/* Alien silhouette */}
                      <circle cx="0" cy="-14" r="5" fill="#000000" />

                      {/* Main ring */}
                      <ellipse cx="0" cy="2" rx="65" ry="18" fill="#192a22" stroke="#3df580" strokeWidth="4" />
                      {/* Ring core lights */}
                      <circle cx="-42" cy="1" r="4.5" fill="#a3ff12" />
                      <circle cx="-21" cy="4" r="4.5" fill="#ffffff" />
                      <circle cx="0" cy="6" r="5.5" fill="#a3ff12" />
                      <circle cx="21" cy="4" r="4.5" fill="#ffffff" />
                      <circle cx="42" cy="1" r="4.5" fill="#a3ff12" />
                    </g>

                    {/* Bold Statement wrapping */}
                    <g transform="translate(250, 400)" textAnchor="middle">
                      <text y="-18" fontFamily="sans-serif" fontWeight="900" fontSize="8.5" fill="#a3ff12" letterSpacing="1">BUEN DÍA, DORMIR Y ADIÓS PARA SIEMPRE</text>
                      <text y="-3" fontFamily="impact, sans-serif" fontSize="16" fill="#ffffff" letterSpacing="2">A INTENTAR SER DISTINTO</text>
                      <text y="14" fontFamily="monospace" fontSize="6.5" fill="#ff7da2" opacity="0.6">MZ.B LT.6 DISRUPTIVE LABS ©</text>
                    </g>
                  </g>
                )}
              </g>
            )}

            {/* PRODUCT ID: MEMORIA & HUMANIDAD */}
            {productId === 'mzb-humanidad' && (
              <g>
                {side === 'front' ? (
                  /* FRONT: MINIMAL AND CLEAN */
                  <g>
                    {/* Centered raw embroidered emblem */}
                    <g transform="translate(250, 240)">
                      <circle cx="0" cy="0" r="45" fill="none" stroke="url(#logoGrad)" strokeWidth="3" strokeDasharray="6,4" />
                      {/* Box coordinates */}
                      <text x="0" y="-8" fontFamily="monospace" fontSize="8" fill="#ffffff" textAnchor="middle" fontWeight="bold">MZ.B LT.6</text>
                      <text x="0" y="8" fontFamily="sans-serif" fontSize="9" fill="#ff7da2" textAnchor="middle" fontWeight="900" letterSpacing="2">HUMANIDAD</text>
                      <text x="0" y="20" fontFamily="monospace" fontSize="6" fill="#9ca3af" textAnchor="middle">EST. 2026</text>
                    </g>
                  </g>
                ) : (
                  /* BACK: MASSIVE GRAFFITI COLLAGE */
                  <g>
                    {/* Shadow overlay of hat wearer */}
                    <path d="M 180,450 C 180,390 200,340 220,330 L 220,290 C 205,290 190,270 195,245 C 195,230 200,210 215,190 C 200,165 204,145 220,135 C 230,130 270,130 280,135 C 296,145 300,165 285,190 C 300,210 305,230 305,245 C 310,270 295,290 280,290 L 280,330 C 300,340 320,390 320,450 Z" fill="#2d3034" opacity="0.75" />

                    {/* Urban FedorHat/bucket hat on details */}
                    <path d="M 195,190 C 220,170 280,170 305,190 L 320,205 C 300,205 200,205 180,205 Z" fill="#111" stroke="#414449" strokeWidth="2" />
                    <rect x="225" y="172" width="50" height="25" fill="#111" rx="4" />
                    <line x1="225" y1="187" x2="275" y2="187" stroke="#ff7da2" strokeWidth="3" />

                    {/* Graffiti word collage directly over top */}
                    <g transform="translate(250, 130)" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" opacity="0.95">
                      <text x="-40" y="20" fontSize="16" fill="#5fc1ff" transform="rotate(-15)" letterSpacing="1">JUSTICIA</text>
                      <text x="50" y="30" fontSize="19" fill="#ff7da2" transform="rotate(10)" letterSpacing="0.5">MEMORIA</text>
                      <text x="-55" y="80" fontSize="22" fill="#ffffff" stroke="#111" strokeWidth="2" transform="rotate(-5)" letterSpacing="1">HUMANIDAD</text>
                      <text x="45" y="100" fontSize="14" fill="#f2ea5b" transform="rotate(-8)">DUELO</text>
                      <text x="-35" y="130" fontSize="18" fill="#6ae29a" transform="rotate(12)">ESPERANZA</text>
                      <text x="35" y="155" fontSize="20" fill="url(#logoGrad)" stroke="#111" strokeWidth="1.5" transform="rotate(-10)">IDENTIDAD</text>
                    </g>

                    {/* Left & Right bottom tags */}
                    <text x="135" y="360" fontFamily="sans-serif" fontSize="12" fill="#ff7da2" fontWeight="bold" transform="rotate(-40)">RESILIENCIA</text>
                    <text x="365" y="360" fontFamily="sans-serif" fontSize="11" fill="#ec4899" fontWeight="bold" transform="rotate(35)">VIOLENCIA</text>

                    {/* Bottom brand sign */}
                    <g transform="translate(250, 415)" textAnchor="middle">
                      <rect x="-40" y="-12" width="80" height="22" fill="#15171a" rx="4" />
                      <text y="3" fontFamily="monospace" fontSize="8" fill="#ffffff" fontWeight="bold" letterSpacing="1">Mz.B Lt.6</text>
                    </g>
                  </g>
                )}
              </g>
            )}

            {/* PRODUCT ID: RIQUEZA ES LA VIDA */}
            {productId === 'mzb-riqueza-vida' && (
              <g>
                {/* Visual back glow */}
                <circle cx="250" cy="270" r="100" fill="#f59e0b" opacity="0.14" filter="blur(22px)" />

                {/* Classic Dual-Cassette Boombox Radio Illustration */}
                <g id="boombox" transform="translate(250, 315)" opacity="0.85">
                  {/* Outer Main Plastic Frame */}
                  <rect x="-75" y="-45" width="150" height="75" fill="#1e1e1e" stroke="#f59e0b" strokeWidth="3" rx="6" />

                  {/* Left speaker */}
                  <circle cx="-42" cy="-5" r="22" fill="#0d0d0d" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="-42" cy="-5" r="14" fill="#2d2d2d" />
                  <circle cx="-42" cy="-5" r="5" fill="#ffffff" />
                  {/* Speaker grid lines */}
                  <line x1="-64" y1="-5" x2="-20" y2="-5" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="-42" y1="-27" x2="-42" y2="17" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />

                  {/* Right speaker */}
                  <circle cx="42" cy="-5" r="22" fill="#0d0d0d" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="42" cy="-5" r="14" fill="#2d2d2d" />
                  <circle cx="42" cy="-5" r="5" fill="#ffffff" />
                  {/* Speaker grid lines */}
                  <line x1="20" y1="-5" x2="64" y2="-5" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="42" y1="-27" x2="42" y2="17" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />

                  {/* Double Cassette Decks Center */}
                  <rect x="-14" y="-12" width="28" height="15" fill="#111111" stroke="#444" strokeWidth="1.5" />
                  <rect x="-14" y="6" width="28" height="15" fill="#111111" stroke="#444" strokeWidth="1.5" />
                  {/* Small cassettes inside */}
                  <polygon points="-7,-8 7,-8 5,-2 -5,-2" fill="#5fc1ff" opacity="0.5" />
                  <polygon points="-7,10 7,10 5,16 -5,16" fill="#ff7da2" opacity="0.5" />

                  {/* Top sliders, radio frequency band, handle */}
                  <rect x="-55" y="-36" width="110" height="6" fill="#111111" />
                  <rect x="-50" y="-34" width="10" height="2" fill="#f59e0b" /> {/* Frequency pointer */}
                  <line x1="-65" y1="-30" x2="65" y2="-30" stroke="#777" strokeWidth="1" />

                  {/* Handle metal */}
                  <path d="M-55,-45 L-55,-55 L55,-55 L55,-45" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                </g>

                {/* Graffiti typography "Riqueza es la Vida" */}
                <g transform="translate(250, 165)" textAnchor="middle">
                  {/* Spray paint spots */}
                  <ellipse cx="-40" cy="10" rx="30" ry="15" fill="#ef4444" opacity="0.3" filter="blur(8px)" />
                  <ellipse cx="50" cy="-10" rx="20" ry="10" fill="#a3ff12" opacity="0.3" filter="blur(8px)" />

                  <text y="-25" fontFamily="impact, Impact, sans-serif" fontSize="24" fill="#ffffff" letterSpacing="1" stroke="#000000" strokeWidth="2">¡ RIQUEZA ES</text>
                  <text y="2" fontFamily="impact, Impact, sans-serif" fontSize="29" fill="#f59e0b" letterSpacing="2" stroke="#000000" strokeWidth="2.5">LA VIDA !</text>
                </g>

                {/* Subtext */}
                <g transform="translate(250, 410)" textAnchor="middle">
                  <text y="0" fontFamily="sans-serif" fontSize="9" fill="#ffffff" fontWeight="bold" opacity="0.9" letterSpacing="1">MÚSICA, BARRIO Y RESISTENCIA</text>
                  <text y="12" fontFamily="monospace" fontSize="6.5" fill="#f59e0b">MZ.B LT.6 STREET ESSENTIALS ©</text>
                </g>
              </g>
            )}

            {/* PRODUCT ID: MZ.B LT.6 CLASSIC SIGNATURE */}
            {productId === 'mzb-classic-signature' && (
              <g>
                {side === 'front' ? (
                  /* FRONT: HIGHLY ELEGANT EMBROIDERED GRADIENT LOGO */
                  <g>
                    {/* Shadow overlay */}
                    <g transform="translate(145, 135)" opacity="0.95">
                      {/* Stylized premium embroidery backing logo */}
                      <rect x="-8" y="-14" width="48" height="34" fill="#ffffff" rx="6" opacity="0.4" filter="blur(6px)" />
                    </g>

                    <g transform="translate(250, 240)">
                      {/* Main central logo representation matching original perfectly */}
                      {/* Glow back */}
                      <circle cx="0" cy="0" r="65" fill="#5fc1ff" opacity="0.12" filter="blur(18px)" />
                      
                      {/* Big elegant text embroidery with colors */}
                      {/* Gradient outline representation */}
                      <text x="0" y="-12" fontFamily="Georgia, serif" fontSize="48" fill="url(#logoGrad)" fontWeight="900" fontStyle="italic" stroke="#121213" strokeWidth="2.5" textAnchor="middle">Mz.B</text>
                      <text x="0" y="32" fontFamily="Georgia, serif" fontSize="48" fill="url(#logoGrad)" fontWeight="900" fontStyle="italic" stroke="#121213" strokeWidth="2.5" textAnchor="middle">Lt.6</text>

                      {/* Small "DE LA CALLE NACE TODO" circular wrap */}
                      <path id="curvePath" d="M -60,40 A 60,60 0 0,0 60,40" fill="none" />
                      <text fontSize="7" fontWeight="bold" fill="#7d7c78" letterSpacing="1.5">
                        <textPath href="#curvePath" startOffset="50%" textAnchor="middle">
                          ORIGINAL STREETWEAR BRAND
                        </textPath>
                      </text>
                    </g>
                  </g>
                ) : (
                  /* BACK: INDUSTRIAL RAW COORDINATES PRINT */
                  <g>
                    {/* Raw layout coordinate details printed on back of white tee */}
                    <g transform="translate(250, 160)" textAnchor="middle">
                      <rect x="-80" y="-15" width="160" height="3" fill="#cbc9bd" />
                      <text y="-25" fontFamily="monospace" fontSize="8" fill="#121213" opacity="0.5" letterSpacing="4">SPECIFICATION DETAILS</text>
                      <text y="20" fontFamily="impact, Arial Black" fontSize="18" fill="#121213" letterSpacing="3">MZ.B LT.6</text>
                    </g>

                    <g transform="translate(250, 260)" textAnchor="middle">
                      {/* Coordinates */}
                      <text y="0" fontFamily="monospace" fontSize="15" fill="#ff7da2" fontWeight="bold">SAN JUAN DE LURIGANCHO</text>
                      <text y="22" fontFamily="monospace" fontSize="15" fill="#5fc1ff" fontWeight="bold">LIMA, PERÚ</text>

                      {/* Geological coordinates */}
                      <text y="48" fontFamily="monospace" fontSize="13" fill="#121213" fontWeight="bold" letterSpacing="1">12° 01' 44\" S  |  77° 01' 15\" W</text>
                      
                      <circle cx="0" cy="80" r="18" fill="none" stroke="#121213" strokeWidth="1.5" strokeDasharray="3,2" />
                      <line x1="-25" y1="80" x2="25" y2="80" stroke="#121213" strokeWidth="1.5" />
                      <line x1="0" y1="55" x2="0" y2="105" stroke="#121213" strokeWidth="1.5" />
                    </g>

                    {/* Industrial certification stamp */}
                    <g transform="translate(250, 400)" textAnchor="middle" opacity="0.45">
                      <text y="0" fontFamily="monospace" fontSize="7" fill="#121213">PRODUCIDO BAJO ESTÁNDAR 100% ALGODÓN REACTIVO</text>
                      <text y="10" fontFamily="monospace" fontSize="7" fill="#121213">ESTAMPO EN SERIGRAFÍA TACTO CERO - PERÚ</text>
                    </g>
                  </g>
                )}
              </g>
            )}

          </g>
        </g>
      </svg>
    </div>
  );
};
