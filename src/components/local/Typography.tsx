import React from 'react';
import { styled } from '@mui/material/styles';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';

const StyledTypography = styled(MuiTypography)(() => ({
  fontFamily: 'var(--theme-font-family-inter)',
  color: 'var(--theme-text-primary)',
  '&.MuiTypography-h1': {
    fontFamily: 'var(--theme-font-family-nunito)',
    fontWeight: 600,
    color: 'var(--theme-text-primary)',
  },
  '&.MuiTypography-h2': {
    fontFamily: 'var(--theme-font-family-nunito)',
    fontWeight: 600,
    color: 'var(--theme-text-primary)',
  },
  '&.MuiTypography-h3': {
    fontFamily: 'var(--theme-font-family-nunito)',
    fontWeight: 600,
    color: 'var(--theme-text-primary)',
  },
  '&.MuiTypography-h4': {
    fontFamily: 'var(--theme-font-family-nunito)',
    fontWeight: 600,
    color: 'var(--theme-text-primary)',
  },
  '&.MuiTypography-h5': {
    fontFamily: 'var(--theme-font-family-nunito)',
    fontWeight: 600,
    color: 'var(--theme-text-primary)',
  },
  '&.MuiTypography-h6': {
    fontFamily: 'var(--theme-font-family-nunito)',
    fontWeight: 600,
    color: 'var(--theme-text-primary)',
  },
  '&.MuiTypography-body1': {
    fontFamily: 'var(--theme-font-family-inter)',
    color: 'var(--theme-text-primary)',
  },
  '&.MuiTypography-body2': {
    fontFamily: 'var(--theme-font-family-inter)',
    color: 'var(--theme-text-secondary)',
  },
  '&.MuiTypography-subtitle1': {
    fontFamily: 'var(--theme-font-family-inter)',
    color: 'var(--theme-text-secondary)',
  },
  '&.MuiTypography-subtitle2': {
    fontFamily: 'var(--theme-font-family-inter)',
    color: 'var(--theme-text-secondary)',
  },
  '&.MuiTypography-caption': {
    fontFamily: 'var(--theme-font-family-inter)',
    color: 'var(--theme-text-secondary)',
  },
  '&.MuiTypography-overline': {
    fontFamily: 'var(--theme-font-family-inter)',
    color: 'var(--theme-text-secondary)',
  },
}));

export interface TypographyProps extends MuiTypographyProps {
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <StyledTypography {...props}>
      {children}
    </StyledTypography>
  );
};

export default Typography;
