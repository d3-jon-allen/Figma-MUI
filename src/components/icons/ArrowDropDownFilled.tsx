import React from 'react';

interface ArrowDropDownFilledProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const ArrowDropDownFilled: React.FC<ArrowDropDownFilledProps> = ({ 
  width = 24, 
  height = 24, 
  color = 'var(--color-action-active)',
  className 
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
        d="M7 10L12 15L17 10H7Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowDropDownFilled;
