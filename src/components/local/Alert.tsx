import React from 'react';
import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';

export interface AlertProps extends Omit<MuiAlertProps, 'ref'> {
  severity?: 'error' | 'warning' | 'info' | 'success';
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ children, ...props }) => {
  return <MuiAlert {...props}>{children}</MuiAlert>;
};

export default Alert;
