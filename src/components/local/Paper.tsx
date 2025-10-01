import React from 'react';
import { styled } from '@mui/material/styles';
import MuiPaper, { PaperProps as MuiPaperProps } from '@mui/material/Paper';

export interface PaperProps extends MuiPaperProps {
  children: React.ReactNode;
}

const StyledPaper = styled(MuiPaper)(() => ({
  backgroundColor: 'var(--theme-paper-background)',
  color: 'var(--theme-text-primary)',
}));

const Paper: React.FC<PaperProps> = ({ children, ...props }) => {
  return (
    <StyledPaper {...props}>
      {children}
    </StyledPaper>
  );
};

export default Paper;
