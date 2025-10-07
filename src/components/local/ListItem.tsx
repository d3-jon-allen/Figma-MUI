import React from 'react';
import { styled } from '@mui/material/styles';
import MuiListItem, { ListItemProps as MuiListItemProps } from '@mui/material/ListItem';
import MuiListItemButton, { ListItemButtonProps as MuiListItemButtonProps } from '@mui/material/ListItemButton';
import MuiListItemIcon, { ListItemIconProps as MuiListItemIconProps } from '@mui/material/ListItemIcon';
import MuiListItemText, { ListItemTextProps as MuiListItemTextProps } from '@mui/material/ListItemText';

const StyledListItem = styled(MuiListItem)(() => ({
  borderRadius: 'var(--theme-spacing-sm)',
  margin: 'var(--theme-spacing-xs) 0',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'var(--theme-action-hover)',
  },
  '&.Mui-selected': {
    backgroundColor: 'var(--theme-action-selected)',
    '&:hover': {
      backgroundColor: 'var(--theme-action-selected)',
    },
  },
  '&.Mui-disabled': {
    backgroundColor: 'transparent',
    color: 'var(--theme-text-disabled)',
    '& .MuiListItemIcon-root': {
      color: 'var(--theme-text-disabled)',
    },
    '& .MuiListItemText-primary': {
      color: 'var(--theme-text-disabled)',
    },
  },
}));

const StyledListItemButton = styled(MuiListItemButton)(() => ({
  borderRadius: 'var(--theme-spacing-sm)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'var(--theme-action-hover)',
  },
  '&.Mui-selected': {
    backgroundColor: 'var(--theme-action-selected)',
    '&:hover': {
      backgroundColor: 'var(--theme-action-selected)',
    },
  },
  '&.Mui-disabled': {
    backgroundColor: 'transparent',
    color: 'var(--theme-text-disabled)',
    '& .MuiListItemIcon-root': {
      color: 'var(--theme-text-disabled)',
    },
    '& .MuiListItemText-primary': {
      color: 'var(--theme-text-disabled)',
    },
  },
  '&:focus-visible': {
    backgroundColor: 'var(--theme-action-focus)',
    outline: 'none',
  },
}));

const StyledListItemIcon = styled(MuiListItemIcon)(() => ({
  minWidth: 'var(--theme-spacing-xl)',
  color: 'var(--theme-text-secondary)',
  transition: 'color 0.2s ease-in-out',
  '.MuiListItem-root.Mui-selected &': {
    color: 'var(--theme-primary-main)',
  },
  '.MuiListItemButton-root.Mui-selected &': {
    color: 'var(--theme-primary-main)',
  },
  '.MuiListItem-root:hover &': {
    color: 'var(--theme-action-active)',
  },
  '.MuiListItemButton-root:hover &': {
    color: 'var(--theme-action-active)',
  },
}));

const StyledListItemText = styled(MuiListItemText)(() => ({
  '& .MuiListItemText-primary': {
    fontSize: '0.875rem',
    fontWeight: 400,
    color: 'var(--theme-text-primary)',
    transition: 'color 0.2s ease-in-out',
  },
  '& .MuiListItemText-secondary': {
    fontSize: '0.875rem',
    color: 'var(--theme-text-secondary)',
    transition: 'color 0.2s ease-in-out',
  },
  '.MuiListItem-root.Mui-selected & .MuiListItemText-primary': {
    color: 'var(--theme-text-primary)',
    fontWeight: 500,
  },
  '.MuiListItemButton-root.Mui-selected & .MuiListItemText-primary': {
    color: 'var(--theme-text-primary)',
    fontWeight: 500,
  },
  '.MuiListItem-root:hover & .MuiListItemText-primary': {
    color: 'var(--theme-text-primary)',
  },
  '.MuiListItemButton-root:hover & .MuiListItemText-primary': {
    color: 'var(--theme-text-primary)',
  },
}));

export interface ListItemProps extends MuiListItemProps {
  children: React.ReactNode;
  button?: boolean;
  dense?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
  selected?: boolean;
}

export interface ListItemButtonProps extends MuiListItemButtonProps {
  children: React.ReactNode;
  dense?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
  selected?: boolean;
}

export interface ListItemIconProps extends MuiListItemIconProps {
  children: React.ReactNode;
}

export interface ListItemTextProps extends MuiListItemTextProps {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ 
  children, 
  button = false,
  ...props 
}) => {
  if (button) {
    return (
      <StyledListItem {...props}>
        <StyledListItemButton selected={props.selected} disabled={props.disabled}>
          {children}
        </StyledListItemButton>
      </StyledListItem>
    );
  }

  return (
    <StyledListItem {...props}>
      {children}
    </StyledListItem>
  );
};

const ListItemButton: React.FC<ListItemButtonProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <StyledListItemButton {...props}>
      {children}
    </StyledListItemButton>
  );
};

const ListItemIcon: React.FC<ListItemIconProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <StyledListItemIcon {...props}>
      {children}
    </StyledListItemIcon>
  );
};

const ListItemText: React.FC<ListItemTextProps> = ({ 
  primary,
  secondary,
  ...props 
}) => {
  return (
    <StyledListItemText
      primary={primary}
      secondary={secondary}
      {...props}
    />
  );
};

export { ListItemButton, ListItemIcon, ListItemText };
export default ListItem;
