import React from 'react';

interface WarningAmberOutlinedProps {
  width?: number | string;
  height?: number | string;
  color?: string; // Defaults to --color-action-active design token
  className?: string;
}

const WarningAmberOutlined: React.FC<WarningAmberOutlinedProps> = ({ 
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
        d="M12 6.49L19.53 19.5H4.47L12 6.49ZM12 2.5L1 21.5H23L12 2.5Z" 
        fill={color}
      />
    </svg>
  );
};

export default WarningAmberOutlined;
