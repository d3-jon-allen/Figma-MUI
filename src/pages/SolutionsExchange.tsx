import React from 'react';
import { Box, Grid } from '@mui/material';
import { 
  Typography, 
  Button, 
  TextField, 
  Autocomplete 
} from '../components/local';
import CustomCardNew from '../components/CustomCardNew';
import { CustomCardNewFlat } from '../components';

const SolutionsExchange: React.FC = () => {
  // Mock data for the cards
  const solutions = [
    {
      id: 1,
      title: "Cloud Security Solution",
      description: "Comprehensive cloud security platform with advanced threat detection",
      status: "Active",
      offerType: "Discount",
      region: "North America",
      category: "Security"
    },
    {
      id: 2,
      title: "Data Analytics Platform",
      description: "Enterprise-grade analytics solution for business intelligence",
      status: "Active",
      offerType: "Free Trial",
      region: "Global",
      category: "Analytics"
    },
    {
      id: 3,
      title: "Risk Management Suite",
      description: "Integrated risk management and compliance platform",
      status: "Active",
      offerType: "Discount",
      region: "Europe",
      category: "Risk Management"
    },
    {
      id: 4,
      title: "Customer Support System",
      description: "AI-powered customer support and ticketing system",
      status: "Active",
      offerType: "Free Trial",
      region: "North America",
      category: "Customer Support"
    },
    {
      id: 5,
      title: "Financial Planning Tool",
      description: "Advanced financial planning and forecasting software",
      status: "Active",
      offerType: "Discount",
      region: "Global",
      category: "Finance"
    },
    {
      id: 6,
      title: "Compliance Monitoring",
      description: "Real-time compliance monitoring and reporting solution",
      status: "Active",
      offerType: "Free Trial",
      region: "Europe",
      category: "Compliance"
    }
  ];

  // Props sourced from Figma second-row cards (node 15841:6546)
  const secondRowCardProps = [
    {
      title: 'ExpertPEO',
      subtitle: 'Broker for PEO services',
      content:
        'Get top-tier PEO services at zero cost. 13 PEOs compete to cut your costs—save big on benefits, comp, and payroll without switching carriers.',
      categories: ['Pricing & Underwriting', 'Product & Operations', 'Technology'],
      categoryColors: ['primary', 'secondary', 'default'] as const,
      buttonColor: 'primary' as const,
    },
    {
      title: 'Turris',
      subtitle: 'Agent onbarding & compliance',
      content:
        'Automate agent onboarding, licensing, and compliance in minutes. Self-serve tools + 6-month free trial & 20% lifetime discount for Members.',
      categories: ['Central Functions', 'Product & Operations', 'Technology'],
      categoryColors: ['default', 'error', 'info'] as const,
      buttonColor: 'secondary' as const,
    },
    {
      title: 'Cardinus',
      subtitle: 'Risk Surveys',
      content:
        'High-quality risk surveys to reduce costs, save lives & meet compliance. Nationwide team. Preferred rates for Accelerant Members.',
      categories: ['Claims', 'Product & Operations', 'Technology'],
      categoryColors: ['default', 'default', 'warning'] as const,
      buttonColor: 'warning' as const,
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
            {solutions.map((solution, index) => (
              <Grid item xs={12} sm={6} md={4} key={solution.id}>
                {index < 3 ? (
                  <CustomCardNew
                    title={solution.title}
                    subtitle={`${solution.offerType} • ${solution.region}`}
                    content={solution.description}
                    usageText="Used by 10+ Members"
                    categories={[solution.category, solution.status, solution.offerType]}
                    categoryColors={["primary", "success", "secondary"]}
                    categoryVariants={["filled", "filled", "filled"]}
                    showPlaceholder={true}
                    actions={[{ label: "See details", variant: "contained", color: "primary" }]}
                    className="h-full flex flex-col"
                  />
                ) : (
                  <CustomCardNewFlat
                    title={secondRowCardProps[index - 3].title}
                    subtitle={secondRowCardProps[index - 3].subtitle}
                    content={secondRowCardProps[index - 3].content}
                    usageText="Used by 10+ Members"
                    categories={secondRowCardProps[index - 3].categories}
                    categoryColors={secondRowCardProps[index - 3].categoryColors as any}
                    categoryVariants={["filled", "filled", "filled"]}
                    showPlaceholder={true}
                    actions={[{ label: "See details", variant: "outlined", color: (secondRowCardProps[index - 3] as any).buttonColor }]}
                    className="h-full flex flex-col"
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
    );
};

export default SolutionsExchange;
