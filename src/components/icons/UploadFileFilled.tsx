import React from 'react';

interface UploadFileFilledProps {
  width?: number | string;
  height?: number | string;
  color?: string; // Defaults to --color-action-active design token
  className?: string;
}

const UploadFileFilled: React.FC<UploadFileFilledProps> = ({ 
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
        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM16 13V16H8V18H16V21L20 17L16 13Z" 
        fill={color}
      />
    </svg>
  );
};

export default UploadFileFilled;
