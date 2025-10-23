import React from 'react';
import { Box, Grid } from '@mui/material';
import { 
  Typography, 
  Button, 
  TextField, 
  Select 
} from '../components/local';
import LessSimpleCard from '../components/LessSimpleCard';
import { useNavigate } from 'react-router-dom';
import { solutions } from '../data/solutions';

const SolutionsExchange: React.FC = () => {
  // cards are provided by shared data module
  const cards = solutions;

  const [filters, setFilters] = React.useState({
    status: 'all',
    offerType: 'all',
    region: 'all',
    category: 'all',
    sortBy: 'newest',
  });

  const filteredCards = React.useMemo(() => {
    let list = cards.filter((c) =>
      (filters.status === 'all' || c.status === filters.status) &&
      (filters.offerType === 'all' || c.offerType === filters.offerType) &&
      (filters.region === 'all' || c.region === filters.region) &&
      (filters.category === 'all' || c.category === filters.category)
    );

    switch (filters.sortBy) {
      case 'az':
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        list = [...list].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'oldest':
        list = [...list].sort((a, b) => a.id - b.id);
        break;
      case 'newest':
      default:
        list = [...list].sort((a, b) => b.id - a.id);
        break;
    }
    return list;
  }, [cards, filters]);

  const navigate = useNavigate();

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
                  color: 'var(--theme-text-primary)'
                }}>
                  Solutions exchange
                </Typography>
                <Typography variant="body1" sx={{
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
            gap: 2,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 2 }, 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              {/* Status Filter */}
              <Select
                label="Status"
                size="small"
                value={filters.status}
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                  { label: 'Pending', value: 'pending' },
                ]}
                onChange={(v) => setFilters((f) => ({ ...f, status: v }))}
                sx={{ width: 'auto' }}
              />

              {/* Offer Type Filter */}
              <Select
                label="Offer type"
                size="small"
                value={filters.offerType}
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Discount', value: 'discount' },
                  { label: 'Free Trial', value: 'free-trial' },
                  { label: 'Special Offer', value: 'special-offer' },
                ]}
                onChange={(v) => setFilters((f) => ({ ...f, offerType: v }))}
                sx={{ width: 'auto' }}
              />

              {/* Region Filter */}
              <Select
                label="Region"
                size="small"
                value={filters.region}
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'United States', value: 'us' },
                  { label: 'Europe', value: 'eu' },
                  { label: 'Canada', value: 'ca' },
                  { label: 'United Kingdom', value: 'uk' },
                ]}
                onChange={(v) => setFilters((f) => ({ ...f, region: v }))}
                sx={{ width: 'auto' }}
              />

              {/* Category Filter */}
              <Select
                label="Category"
                size="small"
                value={filters.category}
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Pricing & Underwriting', value: 'pricing-underwriting' },
                  { label: 'Product & Operations', value: 'product-operations' },
                  { label: 'Technology', value: 'technology' },
                  { label: 'Central Functions', value: 'central-functions' },
                  { label: 'Claims', value: 'claims' },
                ]}
                onChange={(v) => setFilters((f) => ({ ...f, category: v }))}
                sx={{ width: 'auto' }}
              />
            </Box>

            {/* Results and Sort */}
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 2 }, 
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <Typography variant="body1" sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--theme-text-secondary)'
              }}>
                <span style={{ whiteSpace: 'nowrap' }}>32 results</span>
              </Typography>
              <Select
                label="Sort by"
                size="small"
                value={filters.sortBy}
                options={[
                  { label: 'Newest', value: 'newest' },
                  { label: 'Oldest', value: 'oldest' },
                  { label: 'Name A-Z', value: 'az' },
                  { label: 'Name Z-A', value: 'za' },
                ]}
                onChange={(v) => setFilters((f) => ({ ...f, sortBy: v }))}
                sx={{ width: 'auto' }}
              />
            </Box>
          </Box>

          {/* Cards Grid */}
          <Grid container spacing={3}>
            {filteredCards.map((card) => (
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
                  onButtonClick={() => navigate(`/solutions-exchange/${card.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
    );
};

export default SolutionsExchange;
