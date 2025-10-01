import React from 'react';

interface CheckCircleFilledProps {
  width?: number | string;
  height?: number | string;
  color?: string; // Defaults to --color-action-active design token
  className?: string;
}

const CheckCircleFilled: React.FC<CheckCircleFilledProps> = ({ 
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
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" 
        fill={color}
      />
    </svg>
  );
};

export default CheckCircleFilled;
