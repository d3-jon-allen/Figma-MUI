import React from 'react';
import { styled } from '@mui/material/styles';
import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';
import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

const StyledChip = styled(MuiChip)(({ theme }) => ({
  borderRadius: 'var(--theme-spacing-xl)',
  fontWeight: 500,
  transition: 'all 0.2s ease-in-out',
  backgroundColor: 'var(--chip-default-fill)',
  color: 'var(--theme-text-primary)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
    backgroundColor: 'var(--chip-default-hover-fill)',
  },
  '&.MuiChip-clickable': {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'var(--theme-action-hover)',
    },
  },
  '&.MuiChip-deletable': {
    '& .MuiChip-deleteIcon': {
      transition: 'all 0.2s ease-in-out',
      color: 'var(--chip-default-close-fill)',
      '&:hover': {
        color: 'var(--theme-error-main)',
        transform: 'scale(1.2)',
      },
    },
  },
  '&.MuiChip-outlined': {
    borderWidth: 2,
    borderColor: 'var(--chip-default-enabled-border)',
    '&:hover': {
      borderWidth: 2,
      borderColor: 'var(--chip-default-enabled-border)',
    },
  },
  '&.MuiChip-colorPrimary': {
    backgroundColor: 'var(--theme-primary-main)',
    color: 'var(--theme-primary-contrastText)',
  },
  '&.MuiChip-colorSecondary': {
    backgroundColor: 'var(--theme-secondary-main)',
    color: 'var(--theme-secondary-contrastText)',
  },
  '&.MuiChip-colorSuccess': {
    backgroundColor: 'var(--theme-success-main)',
    color: 'var(--theme-success-contrastText)',
  },
  '&.MuiChip-colorWarning': {
    backgroundColor: 'var(--theme-warning-main)',
    color: 'var(--theme-warning-contrastText)',
  },
  '&.MuiChip-colorInfo': {
    backgroundColor: 'var(--theme-info-main)',
    color: 'var(--theme-info-contrastText)',
  },
  '&.MuiChip-colorError': {
    backgroundColor: 'var(--theme-error-main)',
    color: 'var(--theme-error-contrastText)',
  },
  '&.MuiChip-sizeSmall': {
    height: theme.spacing(3),
    fontSize: '0.75rem',
  },
  '&.MuiChip-sizeMedium': {
    height: theme.spacing(4),
    fontSize: '0.875rem',
  },

}));

const StyledAvatar = styled(MuiAvatar)(({ theme }) => ({
  width: 'auto',
  height: 'auto',
  fontSize: '0.875rem',
  fontWeight: 600,
  backgroundColor: 'var(--theme-primary-main)',
  color: 'var(--theme-primary-contrastText)',
  '&.MuiChip-avatarSmall': {
    width: theme.spacing(2),
    height: theme.spacing(2),
    fontSize: '0.75rem',
  },
  '&.MuiChip-avatarMedium': {
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    fontSize: '0.875rem',
  },

}));

export interface ChipProps extends Omit<MuiChipProps, 'avatar'> {
  label: string;
  variant?: 'filled' | 'outlined';
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium';
  clickable?: boolean;
  deletable?: boolean;
  onDelete?: () => void;
  avatar?: React.ReactElement | string;
  icon?: React.ReactElement;
}

export interface AvatarProps extends MuiAvatarProps {
  children: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({ 
  label,
  variant = 'filled',
  color = 'default',
  size = 'medium',
  clickable = false,
  deletable = false,
  onDelete,
  avatar,
  icon,
  ...props 
}) => {
  const renderAvatar = () => {
    if (typeof avatar === 'string') {
      return <StyledAvatar>{avatar}</StyledAvatar>;
    }
    return avatar;
  };

  return (
    <StyledChip
      label={label}
      variant={variant}
      color={color}
      size={size}
      clickable={clickable}
      onDelete={deletable ? onDelete : undefined}
      avatar={avatar ? renderAvatar() : undefined}
      icon={icon}
      {...props}
    />
  );
};

const Avatar: React.FC<AvatarProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <StyledAvatar {...props}>
      {children}
    </StyledAvatar>
  );
};

export { Avatar };
export default Chip;
