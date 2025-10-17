import React from 'react'
import MuiSelect, { SelectChangeEvent, SelectProps as MuiSelectProps } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends Omit<MuiSelectProps<string>, 'onChange'> {
  label?: string
  options: SelectOption[]
  onChange?: (value: string) => void
  fullWidth?: boolean
}

const StyledFormControl = styled(FormControl)(() => ({
  '& .MuiInputBase-root': {
    borderRadius: '12px',
    backgroundColor: 'var(--theme-paper-background)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--theme-border)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--theme-primary-dark)',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--theme-primary-main)',
    borderWidth: '2px',
  },
  // Use stacked content inside the field (label + value)
  '& .MuiSelect-select': {
    fontFamily: 'var(--theme-typography-fontFamily)',
    fontWeight: 'var(--theme-typography-fontWeightRegular)',
    fontSize: 'var(--theme-typography-_fontSize-rem_1, 16px)',
    lineHeight: '24px',
    padding: '12px 16px',
    paddingRight: '40px', // leave room for dropdown icon
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '4px',
  },
  // Small size paddings
  '& .MuiInputBase-sizeSmall .MuiSelect-select': {
    padding: '8px 12px',
    paddingRight: '32px',
  },
  // Dropdown icon color
  '& .MuiSelect-icon': {
    color: 'var(--theme-text-secondary)'
  },
  // Disabled state border token
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--theme-divider)'
  }
}))

const Select: React.FC<SelectProps> = ({ label, options, value = '', onChange, size = 'small', fullWidth = false, sx, ...rest }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange?.(event.target.value as string)
  }

  const selected = options.find((o) => o.value === value)

  return (
    <StyledFormControl fullWidth={fullWidth} size={size} variant="outlined" sx={sx}>
      <MuiSelect
        value={value}
        onChange={handleChange}
        displayEmpty
        renderValue={() => (
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            {label && (
              <span
                style={{
                  fontFamily: 'var(--theme-typography-fontFamily)',
                  fontWeight: 'var(--theme-typography-fontWeightRegular)',
                  fontSize: 'var(--theme-typography-_fontSize-rem_075, 12px)',
                  lineHeight: '12px',
                  color: 'var(--theme-text-secondary)'
                }}
              >
                {label}
              </span>
            )}
            <span
              style={{
                fontFamily: 'var(--theme-typography-fontFamily)',
                fontWeight: 'var(--theme-typography-fontWeightRegular)',
                fontSize: 'var(--theme-typography-_fontSize-rem_1, 16px)',
                lineHeight: '24px',
                color: 'var(--theme-text-primary)'
              }}
            >
              {selected ? selected.label : ''}
            </span>
          </span>
        )}
        {...rest}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={{
              fontFamily: 'var(--theme-typography-fontFamily)',
              fontSize: 'var(--theme-typography-_fontSize-rem_1, 16px)',
              lineHeight: '24px',
              color: 'var(--theme-text-primary)'
            }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </StyledFormControl>
  )
}

export default Select


