import React from 'react';
import { Switch as MuiSwitch, SwitchProps as MuiSwitchProps } from '@mui/material';

export interface SwitchProps extends Omit<MuiSwitchProps, 'ref'> {}

const Switch: React.FC<SwitchProps> = (props) => {
  return <MuiSwitch {...props} />;
};

export default Switch;
