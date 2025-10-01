import React from 'react';
import MuiCardContent, { CardContentProps as MuiCardContentProps } from '@mui/material/CardContent';

export interface CardContentProps extends MuiCardContentProps {
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <MuiCardContent {...props}>
      {children}
    </MuiCardContent>
  );
};

export default CardContent;
