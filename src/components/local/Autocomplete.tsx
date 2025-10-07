import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

// Note: styled() loses generics, so we fix prop typing to a wide signature to
// avoid mismatches with consumer generics while retaining correct DOM props.
const StyledAutocomplete = styled(
  MuiAutocomplete as unknown as React.ComponentType<MuiAutocompleteProps<any, any, any, any>>
)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 'var(--theme-spacing-md)',
    transition: 'all 0.3s ease-in-out',
    backgroundColor: 'var(--theme-paper-background)',
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
  '& .MuiAutocomplete-popupIndicator': {
    transition: 'transform 0.3s ease-in-out',
    color: 'var(--theme-action-active)',
  },
  '&.Mui-focused .MuiAutocomplete-popupIndicator': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAutocomplete-clearIndicator': {
    transition: 'all 0.3s ease-in-out',
    color: 'var(--theme-action-active)',
    '&:hover': {
      backgroundColor: 'var(--theme-action-hover)',
    },
  },
  '& .MuiAutocomplete-tag': {
    borderRadius: 'var(--theme-spacing-sm)',
    margin: 'var(--theme-spacing-xs)',
    backgroundColor: 'var(--theme-primary-light)',
    color: 'var(--theme-primary-contrastText)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'var(--theme-primary-main)',
    },
  },
  '& .MuiAutocomplete-option': {
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: 'var(--theme-action-hover)',
    },
    '&.Mui-focused': {
      backgroundColor: 'var(--theme-action-focus)',
    },
    '&.Mui-selected': {
      backgroundColor: 'var(--theme-action-selected)',
    },
  },
}));

export interface AutocompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'> {
  options: T[];
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
}

const Autocomplete = <T,>({
  options,
  renderInput,
  label,
  placeholder,
  helperText,
  error = false,
  disabled = false,
  required = false,
  fullWidth = true,
  ...props
}: AutocompleteProps<T>) => {
  const defaultRenderInput = (params: AutocompleteRenderInputParams) => (
    <TextField
      {...params}
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
      disabled={disabled}
      required={required}
      fullWidth={fullWidth}
    />
  );

  return (
    <StyledAutocomplete
      options={options}
      renderInput={renderInput || defaultRenderInput}
      fullWidth={fullWidth}
      disabled={disabled}
      {...props}
    />
  );
};

export default Autocomplete;
