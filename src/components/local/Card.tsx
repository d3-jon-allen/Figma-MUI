import React from 'react';
import { styled } from '@mui/material/styles';
import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card';

export interface CardProps extends MuiCardProps {
  children: React.ReactNode;
}

const StyledCard = styled(MuiCard)(() => ({
  backgroundColor: 'var(--theme-paper-background)',
  color: 'var(--theme-text-primary)',
  border: '1px solid var(--theme-border)',
}));

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return (
    <StyledCard {...props}>
      {children}
    </StyledCard>
  );
};

export default Card;
