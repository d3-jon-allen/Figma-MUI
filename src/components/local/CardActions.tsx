import React from 'react';
import MuiCardActions, { CardActionsProps as MuiCardActionsProps } from '@mui/material/CardActions';

export interface CardActionsProps extends MuiCardActionsProps {
  children: React.ReactNode;
}

const CardActions: React.FC<CardActionsProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <MuiCardActions {...props}>
      {children}
    </MuiCardActions>
  );
};

export default CardActions;
