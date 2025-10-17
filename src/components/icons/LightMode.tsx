import React from 'react';

interface LightModeProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

// Simple sun icon (filled) compatible with local icon API
const LightMode: React.FC<LightModeProps> = ({
  width = 24,
  height = 24,
  color = 'var(--color-action-active)',
  className = '',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M11 2h2v3h-2V2Z" fill={color} />
      <path d="M11 19h2v3h-2v-3Z" fill={color} />
      <path d="M2 11h3v2H2v-2Z" fill={color} />
      <path d="M19 11h3v2h-3v-2Z" fill={color} />
      <path d="M4.222 4.222l1.414-1.414L7.757 4.93 6.343 6.343 4.222 4.222Z" fill={color} />
      <path d="M16.243 16.243l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121Z" fill={color} />
      <path d="M4.222 19.778l2.121-2.121 1.414 1.414-2.121 2.121-1.414-1.414Z" fill={color} />
      <path d="M16.243 7.757l2.121-2.121 1.414 1.414-2.121 2.121-1.414-1.414Z" fill={color} />
      <circle cx="12" cy="12" r="5" fill={color} />
    </svg>
  );
};

export default LightMode;


