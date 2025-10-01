import React from 'react';

interface ArrowForwardFilledProps {
  width?: number | string;
  height?: number | string;
  color?: string; // Defaults to --theme-action-active design token
  className?: string;
}

const ArrowForwardFilled: React.FC<ArrowForwardFilledProps> = ({ 
  width = 24, 
  height = 24, 
  color = 'var(--theme-action-active)',
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
        d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" 
        fill={color}
      />
    </svg>
  );
};

export default ArrowForwardFilled;
