import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { 
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Switch,
  Button,
  TextField,
  Select,
  Autocomplete,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
  AppBar,
  Toolbar
} from './components/local';
import { LightMode, DarkMode } from './components/icons';
// Import all icons from the icons folder
import * as Icons from './components/icons';
import SidebarNavigation from './components/SidebarNavigation';
import SolutionsExchange from './pages/SolutionsExchange';
import SolutionDetail from './pages/SolutionDetail';
import Organizations from './pages/Organizations';

// Main App Component with Routing
function App() {
  console.log('🎯 App component is rendering!');
  
  // Light/Dark mode state
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Sidebar state
  const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true);
  
  // Apply theme on mount and when it changes
  React.useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    console.log(`🎨 Theme switched to: ${newMode ? 'Dark' : 'Light'} mode`);
  };

  const handleSidebarToggle = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <Router>
      <ScrollToTop />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar Navigation */}
        <SidebarNavigation 
          isExpanded={isSidebarExpanded} 
          onToggle={handleSidebarToggle} 
        />
        
        {/* Main Content */}
        <Box sx={{ 
          flexGrow: 1,
          backgroundColor: 'var(--theme-page-background)',
          minHeight: '100vh'
        }}>
          {/* Theme Toggle - Minimal overlay in top-right */}
          <Box sx={{ position: 'fixed', top: 12, right: 12, zIndex: 1400 }}>
            <Box
              onClick={handleThemeToggle}
              role="button"
              aria-label="Toggle color mode"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '9999px',
                backgroundColor: 'var(--theme-paper-background)',
                border: '1px solid var(--theme-border)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, border-color 0.2s ease',
                '&:hover': { backgroundColor: 'var(--theme-action-hover)' }
              }}
            >
              {isDarkMode ? (
                <DarkMode width={18} height={18} color={'var(--theme-text-primary)'} />
              ) : (
                <LightMode width={18} height={18} color={'var(--theme-text-primary)'} />
              )}
            </Box>
          </Box>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions-exchange" element={<SolutionsExchange />} />
            <Route path="/solutions-exchange/:id" element={<SolutionDetail />} />
            <Route path="/organizations" element={<Organizations />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

// Home Page Component
function HomePage() {
  return (
    <Container maxWidth="xl" sx={{ 
      py: 4,
      backgroundColor: 'var(--theme-page-background)',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          🎨 Complete MUI Design System
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: 'var(--theme-text-secondary)' }}>
          Powered by Figma Design Tokens + Light.json + Mode 1.json
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--theme-text-secondary)' }}>
          Every component using your merged design tokens automatically!
        </Typography>
      </Box>

      {/* Button Test Showcase */}
      <Paper elevation={3} sx={{ 
        p: 4, 
        mb: 4,
        backgroundColor: 'var(--color-background-paper)',
        color: 'var(--color-text-primary)'
      }}>
        <Typography variant="h4" gutterBottom>
          🔘 Button Test Showcase
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'var(--theme-text-secondary)' }}>
          Testing different button variants and styles from your Figma design
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          backgroundColor: 'var(--theme-page-background)',
          borderRadius: 2,
          border: '1px solid var(--theme-border)'
        }}>
          <Button color="primary" size="large" variant="contained">
            Here's a primary button
          </Button>
          <Button color="secondary" size="large" variant="contained">
            Here's a secondary button
          </Button>
          <Button color="primary" size="large" variant="outlined">
            Here's an outline button
          </Button>
        </Box>
      </Paper>

      {/* All Components Showcase */}
      <Paper elevation={3} sx={{ 
        p: 4, 
        mb: 4,
        backgroundColor: 'var(--color-background-paper)',
        color: 'var(--color-text-primary)'
      }}>
        <Typography variant="h4" gutterBottom>
          🧩 All Components Showcase
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'var(--theme-text-secondary)' }}>
          Quick preview of each component using your design tokens
        </Typography>

        {/* AppBar / Toolbar */}
        <Box sx={{ mb: 3, border: '1px solid var(--theme-border)', borderRadius: 1, overflow: 'hidden' }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                AppBar
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Grid container spacing={3}>
          {/* Buttons */}
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>Buttons</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button variant="contained" color="primary">Primary</Button>
              <Button variant="outlined" color="primary">Outlined</Button>
              <Button variant="text" color="secondary">Text</Button>
              <Button variant="contained" color="secondary">Secondary</Button>
              <Button variant="contained" color="warning">Warning</Button>
              <Button variant="contained" color="success">Success</Button>
            </Box>
          </Grid>

          {/* TextFields, Select & Autocomplete */}
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>Inputs</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Outlined" variant="outlined" size="small" />
              <TextField label="Filled" variant="filled" size="small" />
              <TextField label="Standard" variant="standard" size="small" />
              <Select
                label="Status"
                size="small"
                value="all"
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                ]}
              />
              <Autocomplete
                options={["One", "Two", "Three"]}
                renderInput={(params) => (
                  <TextField {...params} label="Autocomplete" size="small" />
                )}
              />
            </Box>
          </Grid>

          {/* Chips & Switches */}
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>Chips & Switch</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Default" />
              <Chip label="Primary" color="primary" />
              <Chip label="Secondary" color="secondary" />
              <Chip label="Success" color="success" />
              <Switch defaultChecked />
            </Box>
          </Grid>

          {/* Card */}
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>Card</Typography>
            <Card sx={{ border: '1px solid var(--theme-border)' }}>
              <CardHeader title="Card title" subheader="Subheader" />
              <CardContent>
                <Typography variant="body2" sx={{ color: 'var(--theme-text-secondary)' }}>
                  Card content using token-based colors and spacing.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Action</Button>
                <Button size="small" color="secondary">Secondary</Button>
              </CardActions>
            </Card>
          </Grid>

          {/* List */}
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>List</Typography>
            <Paper variant="outlined" sx={{ p: 1 }}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="First item" secondary="Secondary text" />
                  </ListItemButton>
                </ListItem>
                <Divider component="li" />
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Second item" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Typography & Divider */}
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" sx={{ mb: 1 }}>Typography</Typography>
            <Box>
              <Typography variant="h4">Heading h4</Typography>
              <Typography variant="subtitle1" sx={{ color: 'var(--theme-text-secondary)' }}>Subtitle</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1">Body text using theme tokens.</Typography>
              <Typography variant="caption" sx={{ color: 'var(--theme-text-secondary)' }}>Caption</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* All Icons Display */}
      <Paper elevation={3} sx={{ 
        p: 4, 
        mb: 4,
        backgroundColor: 'var(--color-background-paper)',
        color: 'var(--color-text-primary)'
      }}>
        <Typography variant="h4" gutterBottom>
          🎨 All Available Icons
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'var(--theme-text-secondary)' }}>
          Complete icon library with consistent styling and color tokens
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
          gap: 2,
          p: 2
        }}>
          {Object.entries(Icons).map(([name, IconComponent]) => (
            <Box key={name} sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              p: 2,
              borderRadius: 1,
              border: '1px solid var(--theme-border)',
              backgroundColor: 'var(--theme-paper-background)'
            }}>
              <IconComponent 
                width={24} 
                height={24} 
                color="var(--theme-action-active)"
              />
              <Typography variant="caption" sx={{ 
                mt: 1, 
                textAlign: 'center',
                color: 'var(--theme-text-secondary)',
                fontSize: '0.75rem'
              }}>
                {name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Design Token Examples */}
      <Paper elevation={3} sx={{ 
        p: 4, 
        mb: 4,
        backgroundColor: 'var(--color-background-paper)',
        color: 'var(--color-text-primary)'
      }}>
        <Typography variant="h4" gutterBottom>
          🎨 Design Token Examples
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'var(--theme-text-secondary)' }}>
          Examples of design tokens in use throughout the system
        </Typography>
        
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'var(--theme-text-primary)' }}>
            Color Tokens
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Box sx={{ 
              width: 60, 
              height: 60, 
              backgroundColor: 'var(--theme-primary-main)', 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--theme-primary-contrastText)',
              fontSize: '0.75rem',
              textAlign: 'center'
            }}>
              Primary
            </Box>
            <Box sx={{ 
              width: 60, 
              height: 60, 
              backgroundColor: 'var(--theme-secondary-main)', 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--theme-secondary-contrastText)',
              fontSize: '0.75rem',
              textAlign: 'center'
            }}>
              Secondary
            </Box>
            <Box sx={{ 
              width: 60, 
              height: 60, 
              backgroundColor: 'var(--theme-success-main)', 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--theme-success-contrastText)',
              fontSize: '0.75rem',
              textAlign: 'center'
            }}>
              Success
            </Box>
            <Box sx={{ 
              width: 60, 
              height: 60, 
              backgroundColor: 'var(--theme-error-main)', 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--theme-error-contrastText)',
              fontSize: '0.75rem',
              textAlign: 'center'
            }}>
              Error
            </Box>
            <Box sx={{ 
              width: 60, 
              height: 60, 
              backgroundColor: 'var(--theme-warning-main)', 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--theme-warning-contrastText)',
              fontSize: '0.75rem',
              textAlign: 'center'
            }}>
              Warning
            </Box>
            <Box sx={{ 
              width: 60, 
              height: 60, 
              backgroundColor: 'var(--theme-info-main)', 
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--theme-info-contrastText)',
              fontSize: '0.75rem',
              textAlign: 'center'
            }}>
              Info
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Lists Section */}
      <Paper elevation={3} sx={{ 
        p: 4,
        backgroundColor: 'var(--color-background-paper)',
        color: 'var(--color-text-primary)'
      }}>
        <Typography variant="h4" gutterBottom>
          📋 Lists
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'var(--theme-text-secondary)' }}>
          List component examples with proper styling
        </Typography>
        
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'var(--theme-text-primary)' }}>
            List Items
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 1,
            maxWidth: 400
          }}>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1,
              backgroundColor: 'var(--theme-action-selected)',
              border: '1px solid var(--theme-border)'
            }}>
              <Typography sx={{ color: 'var(--theme-text-primary)' }}>
                Selected Item
              </Typography>
            </Box>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1,
              backgroundColor: 'var(--theme-paper-background)',
              border: '1px solid var(--theme-border)',
              '&:hover': {
                backgroundColor: 'var(--theme-action-hover)'
              }
            }}>
              <Typography sx={{ color: 'var(--theme-text-primary)' }}>
                Hover Item
              </Typography>
            </Box>
            <Box sx={{ 
              p: 2, 
              borderRadius: 1,
              backgroundColor: 'var(--theme-paper-background)',
              border: '1px solid var(--theme-border)',
              opacity: 0.6
            }}>
              <Typography sx={{ color: 'var(--theme-text-disabled)' }}>
                Disabled Item
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
