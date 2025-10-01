import React from 'react';

interface ApartmentFilledProps {
  width?: number | string;
  height?: number | string;
  color?: string; // Defaults to --color-action-active design token
  className?: string;
}

const ApartmentFilled: React.FC<ApartmentFilledProps> = ({ 
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
        d="M17 11V3H7V7H3V21H11V15H13V21H21V11H17ZM7 19H5V17H7V19ZM7 15H5V13H7V15ZM7 11H5V9H7V11ZM13 13H11V11H13V13ZM13 9H11V7H13V9ZM13 5H11V3H13V5ZM19 19H17V17H19V19ZM19 15H17V13H19V15Z" 
        fill={color}
      />
    </svg>
  );
};

export default ApartmentFilled;
