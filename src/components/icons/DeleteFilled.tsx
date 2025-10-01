import React from 'react';

interface DeleteFilledProps {
  width?: number | string;
  height?: number | string;
  color?: string; // Defaults to --color-action-active design token
  className?: string;
}

const DeleteFilled: React.FC<DeleteFilledProps> = ({ 
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
        d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" 
        fill={color}
      />
    </svg>
  );
};

export default DeleteFilled;
