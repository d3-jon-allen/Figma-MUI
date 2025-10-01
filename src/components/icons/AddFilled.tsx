import React from 'react';

interface AddFilledProps {
  width?: number | string;
  height?: number | string;
  color?: string; // Defaults to --color-action-active design token
  className?: string;
}

const AddFilled: React.FC<AddFilledProps> = ({ 
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
        d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" 
        fill={color}
      />
    </svg>
  );
};

export default AddFilled;
