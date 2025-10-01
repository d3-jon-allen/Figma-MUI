import React from 'react';

interface ChevronRightFilledProps {
  width?: number | string;
  height?: number | string;
  color?: string; // Defaults to --color-action-active design token
  className?: string;
}

const ChevronRightFilled: React.FC<ChevronRightFilledProps> = ({ 
  width = 24, 
  height = 24, 
  color = 'var(--color-action-active)',
  className = ''
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
        d="M9.70504 6L8.29504 7.41L12.875 12L8.29504 16.59L9.70504 18L15.705 12L9.70504 6Z" 
        fill={color}
      />
    </svg>
  );
};

export default ChevronRightFilled;
