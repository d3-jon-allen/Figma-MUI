import React from 'react';
import MuiBox, { BoxProps as MuiBoxProps } from '@mui/material/Box';

export interface BoxProps extends MuiBoxProps {
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <MuiBox {...props}>
      {children}
    </MuiBox>
  );
};

export default Box;
