import React from 'react';
import { styled } from '@mui/material/styles';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

const StyledButton = styled(MuiButton)(({ ownerState }: any) => ({
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 'var(--theme-typography-fontWeightMedium)', // 500
  fontFamily: 'var(--theme-typography-fontFamily)', // Inter
  // Figma: button/large 15/26, button/medium 14/24, button/small 14/24
  fontSize:
    ownerState?.size === 'large'
      ? 'var(--theme-typography-_fontSize-0.9375rem, 15px)'
      : 'var(--theme-typography-_fontSize-0.875rem, 14px)',
  lineHeight: ownerState?.size === 'large' ? '26px' : '24px',
  transition: 'all 0.2s ease-in-out',
  '&.MuiButton-contained': {
    boxShadow: 'none', // Remove shadow as per design
    backgroundColor: 'var(--theme-primary-main)',
    color: 'var(--theme-primary-contrastText)',
    '&:hover': {
      backgroundColor: 'var(--theme-primary-dark)',
      boxShadow: 'none', // No shadow on hover
    },
  },
  '&.MuiButton-containedSecondary': {
    backgroundColor: 'var(--theme-secondary-main)',
    color: 'var(--theme-secondary-contrastText)',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'var(--theme-secondary-dark)',
      boxShadow: 'none',
    },
  },
  '&.MuiButton-containedSuccess': {
    backgroundColor: 'var(--theme-success-main)',
    color: 'var(--theme-success-contrastText)',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'var(--theme-success-dark)',
      boxShadow: 'none',
    },
  },
  '&.MuiButton-containedError': {
    backgroundColor: 'var(--theme-error-main)',
    color: 'var(--theme-error-contrastText)',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'var(--theme-error-dark)',
      boxShadow: 'none',
    },
  },
  '&.MuiButton-containedWarning': {
    backgroundColor: 'var(--theme-warning-main)',
    color: 'var(--theme-warning-contrastText)',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'var(--theme-warning-dark)',
      boxShadow: 'none',
    },
  },
  '&.MuiButton-containedInfo': {
    backgroundColor: 'var(--theme-info-main)',
    color: 'var(--theme-info-contrastText)',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'var(--theme-info-dark)',
      boxShadow: 'none',
    },
  },
  '&.MuiButton-outlined': {
    borderWidth: 2,
    borderColor: 'var(--theme-primary-main)',
    color: 'var(--theme-primary-main)',
    boxShadow: 'none',
    '&:hover': {
      borderWidth: 2,
      borderColor: 'var(--theme-primary-dark)',
      backgroundColor: 'var(--theme-primary-main)',
      color: 'var(--theme-primary-contrastText)',
      boxShadow: 'none',
    },
  },
  '&.MuiButton-outlinedSecondary': {
    borderColor: 'var(--theme-secondary-main)',
    color: 'var(--theme-secondary-main)',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'var(--theme-secondary-dark)',
      backgroundColor: 'var(--theme-secondary-main)',
      color: 'var(--theme-secondary-contrastText)',
      boxShadow: 'none',
    },
  },
  '&.MuiButton-text': {
    color: 'var(--theme-primary-main)',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'var(--theme-action-hover)',
      boxShadow: 'none',
    },
  },
  '&.MuiButton-textSecondary': {
    color: 'var(--theme-secondary-main)',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'var(--theme-action-hover)',
      boxShadow: 'none',
    },
  },
}));

export interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
