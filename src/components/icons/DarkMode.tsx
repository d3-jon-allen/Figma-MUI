import React from 'react';

interface DarkModeProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

// Simple moon icon compatible with local icon API
const DarkMode: React.FC<DarkModeProps> = ({
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
      <path
        d="M21 12.79C20.37 12.93 19.71 13 19 13c-4.42 0-8-3.58-8-8 0-0.71 0.07-1.37 0.21-2C6.5 3.5 3 7.36 3 12c0 4.97 4.03 9 9 9 4.64 0 8.5-3.5 9-8.21Z"
        fill={color}
      />
    </svg>
  );
};

export default DarkMode;


