import React from 'react';
import { styled } from '@mui/material/styles';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 'var(--theme-spacing-md)',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: 'var(--theme-paper-background)',
    color: 'var(--theme-text-primary)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--theme-border)',
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--theme-primary-main)',
        borderWidth: 2,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--theme-primary-main)',
        borderWidth: 2,
      },
    },
  },
  '& .MuiFilledInput-root': {
    borderRadius: 'var(--theme-spacing-md)',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: 'var(--theme-action-hover)',
    color: 'var(--theme-text-primary)',
    '&:hover': {
      backgroundColor: 'var(--theme-action-hover)',
    },
    '&.Mui-focused': {
      backgroundColor: 'var(--theme-action-selected)',
    },
  },
  '& .MuiInput-root, & .MuiInputBase-input': {
    color: 'var(--theme-text-primary)',
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    color: 'var(--theme-text-secondary)',
    '&.Mui-focused': {
      color: 'var(--theme-primary-main)',
      fontWeight: 600,
    },
  },
  '& .MuiFormHelperText-root': {
    fontSize: '0.875rem',
    marginLeft: theme.spacing(1),
    color: 'var(--theme-text-secondary)',
  },
}));

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
}

const TextField: React.FC<TextFieldProps> = ({ 
  variant = 'outlined', 
  ...props 
}) => {
  return (
    <StyledTextField
      variant={variant}
      fullWidth
      {...props}
    />
  );
};

export default TextField;
