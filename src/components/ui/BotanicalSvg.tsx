import React from 'react';

interface BotanicalProps {
  variant?: 'pepper' | 'pimento' | 'thyme';
  className?: string;
}

export const BotanicalSvg: React.FC<BotanicalProps> = ({ variant = 'pepper', className = 'w-32 h-32' }) => {
  if (variant === 'pepper') {
    // Scotch Bonnet Pepper botanical line art
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Stem */}
        <path
          d="M50 12 C 48 20, 52 24, 48 30"
          stroke="#BDBDBD"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Calyx / Leaf cap */}
        <path
          d="M38 30 C 44 26, 52 26, 58 30 C 56 34, 52 35, 48 35 C 44 35, 40 34, 38 30 Z"
          stroke="#BDBDBD"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Pepper lobes */}
        <path
          d="M38 30 C 30 38, 28 50, 32 62 C 35 72, 44 82, 50 86 C 56 82, 65 72, 68 62 C 72 50, 70 38, 58 30"
          stroke="#BDBDBD"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Inner lobe contours */}
        <path
          d="M44 34 C 40 48, 42 66, 48 78"
          stroke="#BDBDBD"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 3"
        />
        <path
          d="M54 34 C 58 48, 56 66, 52 78"
          stroke="#BDBDBD"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Small botanical bud */}
        <path
          d="M26 24 C 30 20, 36 22, 36 28 C 30 30, 26 26, 26 24 Z"
          stroke="#BDBDBD"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (variant === 'pimento') {
    // Pimento (Allspice) Branch line art
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Central stem */}
        <path
          d="M15 85 C 35 70, 55 50, 85 20"
          stroke="#BDBDBD"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Leaf 1 */}
        <path
          d="M35 70 C 25 58, 30 45, 46 50 C 48 60, 42 68, 35 70 Z"
          stroke="#BDBDBD"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M35 70 Q 40 58 46 50" stroke="#BDBDBD" strokeWidth="1.5" />
        {/* Leaf 2 */}
        <path
          d="M55 52 C 68 40, 78 48, 70 64 C 60 66, 54 60, 55 52 Z"
          stroke="#BDBDBD"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M55 52 Q 65 54 70 64" stroke="#BDBDBD" strokeWidth="1.5" />
        {/* Leaf 3 */}
        <path
          d="M68 36 C 60 22, 72 15, 84 22 C 84 32, 76 38, 68 36 Z"
          stroke="#BDBDBD"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Allspice Berries */}
        <circle cx="75" cy="48" r="4.5" stroke="#BDBDBD" strokeWidth="1.5" />
        <circle cx="82" cy="56" r="3.5" stroke="#BDBDBD" strokeWidth="1.5" />
        <circle cx="68" cy="58" r="4" stroke="#BDBDBD" strokeWidth="1.5" />
      </svg>
    );
  }

  // Thyme / Broadleaf sprig
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 90 C 40 75, 60 55, 75 15"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Pairs of leaflets */}
      <path d="M36 78 C 24 75, 26 65, 36 70 C 44 72, 40 78, 36 78 Z" stroke="#BDBDBD" strokeWidth="1.5" />
      <path d="M38 72 C 48 68, 52 74, 44 80 C 40 80, 38 76, 38 72 Z" stroke="#BDBDBD" strokeWidth="1.5" />
      
      <path d="M50 58 C 38 52, 40 42, 50 48 C 56 50, 54 56, 50 58 Z" stroke="#BDBDBD" strokeWidth="1.5" />
      <path d="M52 54 C 64 48, 66 58, 58 62 C 54 62, 52 58, 52 54 Z" stroke="#BDBDBD" strokeWidth="1.5" />

      <path d="M64 36 C 54 28, 58 20, 66 26 C 70 28, 68 34, 64 36 Z" stroke="#BDBDBD" strokeWidth="1.5" />
      <path d="M66 32 C 76 24, 82 32, 74 38 C 70 38, 68 34, 66 32 Z" stroke="#BDBDBD" strokeWidth="1.5" />
    </svg>
  );
};
