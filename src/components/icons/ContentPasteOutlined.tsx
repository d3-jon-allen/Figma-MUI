import React from 'react';

interface ContentPasteOutlinedProps {
  width?: number | string;
  height?: number | string;
  color?: string; // Defaults to --color-action-active design token
  className?: string;
}

const ContentPasteOutlined: React.FC<ContentPasteOutlinedProps> = ({ 
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
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM17 13H7V11H17V13ZM15 17H7V15H15V17ZM7 9H17V7H7V9Z" 
        fill={color}
      />
    </svg>
  );
};

export default ContentPasteOutlined;
