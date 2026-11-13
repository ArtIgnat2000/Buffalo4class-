import React from 'react';

// A full-body cartoon bison with walking animation
export function WalkingBison({ className = '', scale = 1 }: { className?: string; scale?: number }) {
  return (
    <div className={`relative ${className}`} style={{ transform: `scale(${scale})`, transformOrigin: 'bottom left' }}>
      <div className="animate-bob">
        <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tail */}
          <g className="animate-tail" style={{ transformOrigin: '50px 70px' }}>
            <path d="M55 75 Q30 80 40 105 L36 108 Q25 82 48 70 Z" fill="#3d2512" stroke="#1f1208" strokeWidth="2" strokeLinejoin="round"/>
            <circle cx="37" cy="108" r="6" fill="#1f1208"/>
          </g>

          {/* Far-side legs sit behind the body, with shaded fur and higher hooves.
              Each far leg moves with the opposite-side near leg (diagonal gait).
              The 32px spacing and small stride keep all four hooves readable. */}
          <g data-bison-leg="far-hind" className="animate-leg-front" style={{ transformOrigin: '78px 82px' }}>
            <rect x="70" y="82" width="16" height="41" rx="6" fill="#51321b" stroke="#1f1208" strokeWidth="2"/>
            <ellipse cx="78" cy="124" rx="8" ry="4" fill="#1f1208"/>
          </g>
          <g data-bison-leg="far-fore" className="animate-leg-back" style={{ transformOrigin: '142px 82px' }}>
            <rect x="134" y="82" width="16" height="41" rx="6" fill="#51321b" stroke="#1f1208" strokeWidth="2"/>
            <ellipse cx="142" cy="124" rx="8" ry="4" fill="#1f1208"/>
          </g>

          {/* Body */}
          <path d="M60 60 Q55 50 75 45 Q95 30 130 32 Q165 35 180 55 Q188 68 185 85 Q183 95 170 98 L70 98 Q55 95 50 80 Q46 68 60 60 Z"
                fill="#6b4423" stroke="#1f1208" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Shaggy hump/back fur */}
          <path d="M70 55 Q90 30 130 35 Q110 38 95 48 Q85 53 70 58" fill="#3d2512" stroke="#1f1208" strokeWidth="2"/>
          {/* Fur texture lines */}
          <path d="M75 60 Q90 52 105 56" stroke="#3d2512" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M110 45 Q120 40 135 43" stroke="#1f1208" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <path d="M85 70 Q100 66 120 72" stroke="#3d2512" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

          {/* Near-side hind and fore legs, in front of the body. */}
          <g data-bison-leg="near-hind" className="animate-leg-back" style={{ transformOrigin: '110px 85px' }}>
            <rect x="102" y="85" width="16" height="45" rx="6" fill="#3d2512" stroke="#1f1208" strokeWidth="2"/>
            <ellipse cx="110" cy="132" rx="10" ry="5" fill="#1f1208"/>
          </g>
          <g data-bison-leg="near-fore" className="animate-leg-front" style={{ transformOrigin: '174px 85px' }}>
            <rect x="166" y="85" width="17" height="45" rx="6" fill="#3d2512" stroke="#1f1208" strokeWidth="2"/>
            <ellipse cx="174" cy="132" rx="10" ry="5" fill="#1f1208"/>
          </g>

          {/* Neck */}
          <path d="M175 55 Q195 45 200 30 Q205 20 195 25 Q185 30 178 50 Z" fill="#6b4423" stroke="#1f1208" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Head */}
          <path d="M185 25 Q200 15 212 22 Q218 28 215 40 Q210 52 198 50 Q185 48 180 38 Q178 30 185 25 Z"
                fill="#6b4423" stroke="#1f1208" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Head fur cap */}
          <path d="M185 25 Q200 14 212 22 Q206 20 198 23 Q190 26 185 30 Z" fill="#3d2512" stroke="#1f1208" strokeWidth="2"/>
          {/* Beard/chin fur */}
          <path d="M195 44 Q200 58 203 50 Q202 45 198 43" fill="#3d2512" stroke="#1f1208" strokeWidth="1.5"/>
          {/* Eye */}
          <circle cx="201" cy="33" r="3" fill="#1f1208"/>
          <circle cx="202" cy="32" r="1" fill="#fff"/>
          {/* Nose */}
          <ellipse cx="213" cy="38" rx="4" ry="3" fill="#1f1208"/>
          <ellipse cx="212" cy="37" rx="1" ry="0.8" fill="#6b4423"/>
          {/* Ear */}
          <path d="M192 23 Q186 16 183 24 Q186 28 192 28 Z" fill="#3d2512" stroke="#1f1208" strokeWidth="2"/>
          {/* Horn */}
          <path d="M188 22 Q180 10 175 14 Q178 22 186 24 Z" fill="#d4c4a0" stroke="#1f1208" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M177 14 Q174 11 175 15" stroke="#1f1208" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>
    </div>
  );
}

// Simple cute bison face
export function BisonFace({ size = 80, mood = 'happy' }: { size?: number; mood?: 'happy' | 'surprised' | 'cool' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {/* Head */}
      <path d="M15 50 Q10 25 35 20 Q60 12 80 25 Q90 35 88 55 Q85 75 70 80 Q30 85 20 72 Q12 62 15 50 Z"
            fill="#6b4423" stroke="#1f1208" strokeWidth="3"/>
      {/* Shaggy top */}
      <path d="M20 38 Q30 18 50 18 Q70 18 78 30 Q65 25 50 26 Q35 28 22 38" fill="#3d2512" stroke="#1f1208" strokeWidth="2.5"/>
      {/* Horns */}
      <path d="M20 32 Q10 20 18 17 Q25 22 28 32 Z" fill="#d4c4a0" stroke="#1f1208" strokeWidth="2"/>
      <path d="M78 32 Q88 20 82 17 Q75 22 72 32 Z" fill="#d4c4a0" stroke="#1f1208" strokeWidth="2"/>
      {/* Ears */}
      <ellipse cx="22" cy="42" rx="6" ry="9" fill="#3d2512" stroke="#1f1208" strokeWidth="2"/>
      <ellipse cx="78" cy="42" rx="6" ry="9" fill="#3d2512" stroke="#1f1208" strokeWidth="2"/>
      {/* Eyes */}
      {mood === 'cool' ? (
        <>
          <rect x="28" y="44" width="18" height="5" rx="2" fill="#1f1208"/>
          <rect x="54" y="44" width="18" height="5" rx="2" fill="#1f1208"/>
        </>
      ) : mood === 'surprised' ? (
        <>
          <circle cx="37" cy="48" r="6" fill="#fff" stroke="#1f1208" strokeWidth="2"/>
          <circle cx="63" cy="48" r="6" fill="#fff" stroke="#1f1208" strokeWidth="2"/>
          <circle cx="37" cy="48" r="3" fill="#1f1208"/>
          <circle cx="63" cy="48" r="3" fill="#1f1208"/>
        </>
      ) : (
        <>
          <circle cx="37" cy="50" r="4" fill="#1f1208"/>
          <circle cx="63" cy="50" r="4" fill="#1f1208"/>
          <circle cx="38" cy="49" r="1.3" fill="#fff"/>
          <circle cx="64" cy="49" r="1.3" fill="#fff"/>
        </>
      )}
      {/* Nose */}
      <ellipse cx="50" cy="68" rx="14" ry="10" fill="#3d2512" stroke="#1f1208" strokeWidth="2.5"/>
      <ellipse cx="45" cy="66" rx="2" ry="1.5" fill="#1f1208"/>
      <ellipse cx="55" cy="66" rx="2" ry="1.5" fill="#1f1208"/>
      {/* Mouth */}
      {mood === 'surprised' ? (
        <ellipse cx="50" cy="78" rx="5" ry="4" fill="#1f1208"/>
      ) : (
        <path d="M42 76 Q50 82 58 76" stroke="#1f1208" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      )}
    </svg>
  );
}

// Prairie dog popping up
export function PrairieDog({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <div className="animate-prairie-dog" style={style}>
      <svg width="60" height="70" viewBox="0 0 60 70">
        {/* Body */}
        <ellipse cx="30" cy="45" rx="18" ry="22" fill="#c49060" stroke="#1f1208" strokeWidth="2"/>
        {/* Belly */}
        <ellipse cx="30" cy="52" rx="11" ry="13" fill="#e6c298"/>
        {/* Head */}
        <circle cx="30" cy="28" r="18" fill="#c49060" stroke="#1f1208" strokeWidth="2"/>
        {/* Ears */}
        <circle cx="18" cy="18" r="5" fill="#c49060" stroke="#1f1208" strokeWidth="2"/>
        <circle cx="42" cy="18" r="5" fill="#c49060" stroke="#1f1208" strokeWidth="2"/>
        {/* Eyes */}
        <circle cx="24" cy="26" r="3" fill="#1f1208"/>
        <circle cx="36" cy="26" r="3" fill="#1f1208"/>
        <circle cx="25" cy="25" r="1" fill="#fff"/>
        <circle cx="37" cy="25" r="1" fill="#fff"/>
        {/* Nose */}
        <ellipse cx="30" cy="33" rx="2.5" ry="2" fill="#1f1208"/>
        {/* Whiskers */}
        <line x1="18" y1="34" x2="10" y2="32" stroke="#1f1208" strokeWidth="1"/>
        <line x1="42" y1="34" x2="50" y2="32" stroke="#1f1208" strokeWidth="1"/>
        {/* Mouth */}
        <path d="M26 37 Q30 40 34 37" stroke="#1f1208" strokeWidth="1.5" fill="none"/>
        {/* Paws */}
        <ellipse cx="20" cy="62" rx="5" ry="4" fill="#8b5a3c" stroke="#1f1208" strokeWidth="1.5"/>
        <ellipse cx="40" cy="62" rx="5" ry="4" fill="#8b5a3c" stroke="#1f1208" strokeWidth="1.5"/>
      </svg>
    </div>
  );
}

// Decorative grass tuft
export function GrassTuft({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={`absolute animate-grass ${className}`} style={{ animationDelay: `${delay}s` }}>
      <svg width="50" height="60" viewBox="0 0 50 60">
        <path d="M25 60 Q15 30 8 10 Q20 25 25 15 Q28 30 35 10 Q35 30 42 15 Q35 35 25 60 Z" fill="#4f8520" stroke="#2d5010" strokeWidth="1.5"/>
        <path d="M25 60 Q22 40 22 25" stroke="#2d5010" strokeWidth="1" fill="none"/>
      </svg>
    </div>
  );
}
