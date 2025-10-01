import React from 'react';
import MuiContainer, { ContainerProps as MuiContainerProps } from '@mui/material/Container';

export interface ContainerProps extends MuiContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <MuiContainer {...props}>
      {children}
    </MuiContainer>
  );
};

export default Container;
