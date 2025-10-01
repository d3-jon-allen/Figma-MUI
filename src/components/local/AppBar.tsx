import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

const StyledAppBar = styled(MuiAppBar)(() => ({
  backgroundColor: 'var(--theme-paper-background)', // background.paper-elevation-4 from Figma
  color: 'var(--theme-text-primary)',
  fontFamily: 'var(--theme-font-family-inter)',
  boxShadow: 'var(--shadow-1)', // 0px 4px 5px rgba(0,0,0,0.5) from Figma
  '& .MuiToolbar-root': {
    minHeight: 'var(--theme-spacing-xxl)', // 48px
    padding: '0 var(--theme-spacing-lg)',
  },
}));

export interface AppBarProps extends MuiAppBarProps {
  children: React.ReactNode;
}

const AppBar: React.FC<AppBarProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <StyledAppBar {...props}>
      {children}
    </StyledAppBar>
  );
};

export default AppBar;
