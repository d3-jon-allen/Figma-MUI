import React from 'react';
import { Box, Grid } from '@mui/material';
import { 
  Typography, 
  Button, 
  TextField, 
  Autocomplete 
} from '../components/local';
import LessSimpleCard from '../components/LessSimpleCard';

const SolutionsExchange: React.FC = () => {
  // Figma-sourced card data for Solutions Exchange (node 15702:104250)
  const cards = [
    {
      id: 1,
      title: 'SchemeServe',
      subtitle: 'Policy Admin System',
      content:
        'SchemeServe gives you the confidence to build your own schemes, and beat your competitors to market.',
      chips: ['Pricing & Underwriting', 'Product & Operations', 'Technology'],
    },
    {
      id: 2,
      title: 'InsCipher',
      subtitle: 'Surplus Lines Filing Service',
      content:
        'Get top-tier PEO services at zero cost. 13 PEOs compete to cut your costs—save big on benefits, comp, and payroll without switching carriers.',
      chips: ['Central Functions', 'Product & Operations', 'Technology'],
    },
    {
      id: 3,
      title: 'Sanctions.io',
      subtitle: 'Integrated Sanctions, PEP & Adverse Media Screening for MGAs',
      content:
        'Screen customers against global watchlists with fast, accurate AML checks. API & portal access, with low false positives. 20% off for Members.',
      chips: ['Central Functions', 'Technology'],
    },
    {
      id: 4,
      title: 'ExpertPEO',
      subtitle: 'Broker for PEO services',
      content:
        'Get top-tier PEO services at zero cost. 13 PEOs compete to cut your costs—save big on benefits, comp, and payroll without switching carriers.',
      chips: ['Pricing & Underwriting', 'Product & Operations', 'Technology'],
    },
    {
      id: 5,
      title: 'Turris',
      subtitle: 'Agent onboarding & compliance',
      content:
        'Automate agent onboarding, licensing, and compliance in minutes. Self-serve tools + 6-month free trial & 20% lifetime discount for Members.',
      chips: ['Central Functions', 'Product & Operations', 'Technology'],
    },
    {
      id: 6,
      title: 'Cardinus',
      subtitle: 'Risk Surveys',
      content:
        'High-quality risk surveys to reduce costs, save lives & meet compliance. Nationwide team. Preferred rates for Accelerant Members.',
      chips: ['Claims', 'Pricing & Underwriting', 'Technology'],
    },
  ];

  return (
    <>
      {/* Header Section */}
      <Box sx={{ 
        p: 5,
        backgroundColor: 'var(--theme-page-background)'
      }}>
          {/* Page Header */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            mb: 4
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                maxWidth: '800px',
                minWidth: '400px',
                flex: 1
              }}>
                <Typography variant="h1" sx={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '2rem',
                  fontWeight: 600,
                  lineHeight: 1.167,
                  color: 'var(--theme-text-primary)'
                }}>
                  Solutions exchange
                </Typography>
                <Typography variant="body1" sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: 'var(--theme-text-secondary)'
                }}>
                  Explore a collection of solutions to support your business growth with exclusive offers for Accelerant Members. Submit a request if you're interested in more information.
                </Typography>
              </Box>
              <Button 
                color="primary" 
                size="large" 
                variant="contained"
              >
                Add solution
              </Button>
            </Box>
          </Box>

          {/* Search Section */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            alignItems: 'flex-start'
          }}>
            <TextField 
              variant="outlined" 
              size="small" 
              label="Search solutions"
              sx={{
                flex: 1
              }}
            />
            <Button 
              color="primary" 
              size="large" 
              variant="outlined"
            >
              Search
            </Button>
          </Box>
        </Box>

        {/* Content Section */}
        <Box sx={{ 
          backgroundColor: 'var(--theme-secondary-background, #fcfcfd)',
          p: 5,
          minHeight: 'calc(100vh - 200px)'
        }}>
          {/* Filters Section */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 4,
            gap: 2
          }}>
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              alignItems: 'center'
            }}>
              {/* Status Filter */}
              <Autocomplete
                options={['All', 'Active', 'Inactive', 'Pending']}
                defaultValue="All"
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Status"
                    size="small"
                    sx={{
                      minWidth: '120px'
                    }}
                  />
                )}
              />

              {/* Offer Type Filter */}
              <Autocomplete
                options={['All', 'Discount', 'Free Trial', 'Special Offer']}
                defaultValue="All"
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Offer type"
                    size="small"
                    sx={{
                      minWidth: '120px'
                    }}
                  />
                )}
              />

              {/* Region Filter */}
              <Autocomplete
                options={['All', 'North America', 'Europe', 'Asia', 'Global']}
                defaultValue="All"
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Region"
                    size="small"
                    sx={{
                      minWidth: '120px'
                    }}
                  />
                )}
              />

              {/* Category Filter */}
              <Autocomplete
                options={['All', 'Security', 'Analytics', 'Risk Management', 'Finance', 'Compliance']}
                defaultValue="All"
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Category"
                    size="small"
                    sx={{
                      minWidth: '120px'
                    }}
                  />
                )}
              />
            </Box>

            {/* Results and Sort */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              alignItems: 'center'
            }}>
              <Typography variant="body1" sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--theme-text-secondary)'
              }}>
                32 results
              </Typography>
              <Autocomplete
                options={['Newest', 'Oldest', 'Name A-Z', 'Name Z-A']}
                defaultValue="Newest"
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    label="Sort by"
                    size="small"
                    sx={{
                      minWidth: '120px'
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          {/* Cards Grid */}
          <Grid container spacing={3}>
            {cards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <LessSimpleCard
                  elevation={1}
                  title={card.title}
                  subtitle={card.subtitle}
                  content={card.content}
                  chips={card.chips}
                  buttonLabel="See details"
                  buttonVariant="outlined"
                  buttonColor="primary"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
    );
};

export default SolutionsExchange;
