import React from 'react';
import { Box, Drawer, List } from '@mui/material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from './local';
import { 
  CheckCircleFilled,
  ContentPasteOutlined,
  PhotoOutlined,
  StarSharp,
  UploadFileFilled,
  PeopleFilled,
  ApartmentFilled,
  MenuFilled,
  HomeFilled
} from './icons';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarNavigationProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ isExpanded, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { icon: HomeFilled, label: 'Design System', path: '/', active: location.pathname === '/' },
    { icon: ApartmentFilled, label: 'Organizations', path: '/organizations', active: location.pathname === '/organizations' },
    { icon: PeopleFilled, label: 'Members', path: '/members', active: location.pathname === '/members' },
    { icon: CheckCircleFilled, label: 'Planning', path: '/planning', active: location.pathname === '/planning' },
    { icon: PhotoOutlined, label: 'Analytics', path: '/analytics', active: location.pathname === '/analytics' },
    { icon: UploadFileFilled, label: 'Bordereaux', path: '/bordereaux', active: location.pathname === '/bordereaux' },
    { icon: ContentPasteOutlined, label: 'Risk Scoring', path: '/risk-scoring', active: location.pathname === '/risk-scoring' },
    { icon: StarSharp, label: 'Solutions Exchange', path: '/solutions-exchange', active: location.pathname === '/solutions-exchange' },
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isExpanded ? '248px' : '88px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isExpanded ? '248px' : '88px',
          backgroundColor: 'var(--theme-paper-background)',
          borderRight: '1px solid var(--theme-border)',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        backgroundColor: 'var(--theme-paper-background)'
      }}>
        {/* Header with Menu Toggle */}
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid var(--theme-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ListItemButton
            onClick={onToggle}
            sx={{
              minWidth: 'auto',
              p: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'var(--theme-action-hover)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <MenuFilled 
                width={24} 
                height={24} 
                color="var(--theme-action-active)"
              />
            </ListItemIcon>
          </ListItemButton>
        </Box>

        {/* Navigation Items */}
        <List sx={{ flexGrow: 1, p: 1 }}>
          {navigationItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                selected={item.active}
                sx={{
                  px: isExpanded ? 2 : 1,
                  py: 1.5,
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: isExpanded ? '40px' : 'auto',
                }}>
                  <item.icon 
                    width={24} 
                    height={24} 
                    color={item.active ? "var(--theme-action-active)" : "var(--theme-text-secondary)"}
                  />
                </ListItemIcon>
                {isExpanded && (
                  <ListItemText 
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.875rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: item.active ? 500 : 400,
                        lineHeight: 1.5,
                        color: item.active ? 'var(--theme-text-primary)' : 'var(--theme-text-secondary)'
                      }
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Footer */}
        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid var(--theme-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isExpanded ? 'space-between' : 'center'
        }}>
          {isExpanded && (
            <Typography variant="caption" sx={{
              fontSize: '0.75rem',
              color: 'var(--theme-text-secondary)',
              fontFamily: 'Inter, sans-serif'
            }}>
              v1.0.0
            </Typography>
          )}
          <Box sx={{ 
            width: 8, 
            height: 8, 
            borderRadius: '50%',
            backgroundColor: 'var(--theme-success-main)'
          }} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default SidebarNavigation;
