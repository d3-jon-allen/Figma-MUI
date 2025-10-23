import React from 'react';
import { styled } from '@mui/material/styles';
import MuiPaper, { PaperProps as MuiPaperProps } from '@mui/material/Paper';

export interface PaperProps extends MuiPaperProps {
  children: React.ReactNode;
}

const StyledPaper = styled(MuiPaper)(() => ({
}));

const Paper: React.FC<PaperProps> = ({ children, ...props }) => {
  return (
    <StyledPaper {...props}>
      {children}
    </StyledPaper>
  );
};

export default Paper;
