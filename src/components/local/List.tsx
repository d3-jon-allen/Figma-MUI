import React from 'react';
import { styled } from '@mui/material/styles';
import MuiList, { ListProps as MuiListProps } from '@mui/material/List';
import MuiListSubheader, { ListSubheaderProps as MuiListSubheaderProps } from '@mui/material/ListSubheader';

const StyledList = styled(MuiList)(() => ({
  borderRadius: 'var(--theme-spacing-sm)',
  padding: 'var(--theme-spacing-sm)',
  backgroundColor: 'var(--theme-paper-background)',
  border: '1px solid var(--theme-border)',
  transition: 'all 0.3s ease-in-out',
  '& .MuiListItem-root:first-of-type': {
    borderTopLeftRadius: 'var(--theme-spacing-sm)',
    borderTopRightRadius: 'var(--theme-spacing-sm)',
  },
  '& .MuiListItem-root:last-of-type': {
    borderBottomLeftRadius: 'var(--theme-spacing-sm)',
    borderBottomRightRadius: 'var(--theme-spacing-sm)',
  },
}));

const StyledListSubheader = styled(MuiListSubheader)(() => ({
  backgroundColor: 'var(--theme-action-selected)',
  color: 'var(--theme-text-primary)',
  fontWeight: 600,
  fontSize: '0.875rem',
  lineHeight: 1.5,
  padding: 'var(--theme-spacing-sm) var(--theme-spacing-md)',
  marginBottom: 'var(--theme-spacing-sm)',
  borderRadius: 'var(--theme-spacing-xs)',
  borderBottom: '1px solid var(--theme-divider)',
  '&.MuiListSubheader-sticky': {
    backgroundColor: 'var(--theme-action-selected)',
    borderBottom: '1px solid var(--theme-divider)',
  },
}));

export interface ListProps extends MuiListProps {
  children: React.ReactNode;
  dense?: boolean;
  disablePadding?: boolean;
  subheader?: React.ReactNode;
}

export interface ListSubheaderProps extends MuiListSubheaderProps {
  children: React.ReactNode;
}

const List: React.FC<ListProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <StyledList {...props}>
      {children}
    </StyledList>
  );
};

const ListSubheader: React.FC<ListSubheaderProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <StyledListSubheader {...props}>
      {children}
    </StyledListSubheader>
  );
};

export { ListSubheader };
export default List;
