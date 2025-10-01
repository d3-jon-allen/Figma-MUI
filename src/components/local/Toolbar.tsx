import React from 'react';
import MuiToolbar, { ToolbarProps as MuiToolbarProps } from '@mui/material/Toolbar';

export interface ToolbarProps extends MuiToolbarProps {
  children: React.ReactNode;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <MuiToolbar {...props}>
      {children}
    </MuiToolbar>
  );
};

export default Toolbar;
