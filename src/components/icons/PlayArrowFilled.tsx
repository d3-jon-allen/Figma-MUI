import React from 'react';

interface PlayArrowFilledProps {
  width?: number | string;
  height?: number | string;
  color?: string; // Defaults to --color-action-active design token
  className?: string;
}

const PlayArrowFilled: React.FC<PlayArrowFilledProps> = ({ 
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
        d="M8 5V19L19 12L8 5Z" 
        fill={color}
      />
    </svg>
  );
};

export default PlayArrowFilled;
