import React from 'react';
import { Divider as MuiDivider, DividerProps as MuiDividerProps } from '@mui/material';

export interface DividerProps extends Omit<MuiDividerProps, 'ref'> {}

const Divider: React.FC<DividerProps> = (props) => {
  return <MuiDivider {...props} />;
};

export default Divider;
