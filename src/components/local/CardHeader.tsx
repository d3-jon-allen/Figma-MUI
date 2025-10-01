import React from 'react';
import { styled } from '@mui/material/styles';
import MuiCardHeader, { CardHeaderProps as MuiCardHeaderProps } from '@mui/material/CardHeader';
import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

const StyledCardHeader = styled(MuiCardHeader)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  '& .MuiCardHeader-avatar': {
    marginRight: theme.spacing(2),
  },
  '& .MuiCardHeader-action': {
    marginTop: 0,
    marginBottom: 0,
    alignSelf: 'center',
  },
  '& .MuiCardHeader-title': {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: 'var(--theme-text-primary)',
    lineHeight: 1.4,
  },
  '& .MuiCardHeader-subheader': {
    fontSize: '0.875rem',
    color: 'var(--theme-text-secondary)',
    lineHeight: 1.4,
    marginTop: theme.spacing(0.5),
  },
  '& .MuiCardHeader-content': {
    minWidth: 0,
  },
}));

const StyledAvatar = styled(MuiAvatar)(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  fontSize: '1.25rem',
  fontWeight: 600,
  backgroundColor: 'var(--theme-primary-main)',
  color: 'var(--theme-primary-contrastText)',
  '&.MuiCardHeader-avatar': {
    marginRight: theme.spacing(2),
  },
}));

export interface CardHeaderProps extends Omit<MuiCardHeaderProps, 'avatar'> {
  title: React.ReactNode;
  subheader?: React.ReactNode;
  avatar?: React.ReactElement | string;
  action?: React.ReactNode;
  titleTypographyProps?: any;
  subheaderTypographyProps?: any;
}

export interface AvatarProps extends MuiAvatarProps {
  children: React.ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({ 
  title,
  subheader,
  avatar,
  action,
  titleTypographyProps,
  subheaderTypographyProps,
  ...props 
}) => {
  const renderAvatar = () => {
    if (typeof avatar === 'string') {
      return <StyledAvatar>{avatar}</StyledAvatar>;
    }
    return avatar;
  };

  return (
    <StyledCardHeader
      title={title}
      subheader={subheader}
      avatar={avatar ? renderAvatar() : undefined}
      action={action}
      titleTypographyProps={titleTypographyProps}
      subheaderTypographyProps={subheaderTypographyProps}
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
export default CardHeader;
