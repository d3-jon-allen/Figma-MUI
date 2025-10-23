import React from 'react'
import { Container, Box, Typography, CardHeader, Chip, Button } from '../components/local'
import LessSimpleCard from '../components/LessSimpleCard'

const Organizations: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Organizations
      </Typography>


        <Box sx={{ display: 'grid', gap: '24px', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' } }}>
          <LessSimpleCard elevation={1}>
            <Box sx={{ mb: 'var(--theme-spacing-md)' }}>
              <CardHeader title="MarketMingle" subheader="Social media strategy & management" sx={{ p: 0 }} />
            </Box>

            <Typography
              variant="body1"
              sx={{
                fontFamily: 'var(--theme-font-family-inter)',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--theme-text-primary)',
                mb: 'var(--theme-spacing-md)'
              }}
            >
              Leverage expert social media strategies to boost your brand presence. Comprehensive management services ensure engagement and growth across all platforms.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--theme-spacing-sm)',
                mb: 'var(--theme-spacing-lg)'
              }}
            >
              <Chip label="Marketing & Branding" variant="filled" color="default" size="small" />
              <Chip label="Growth & Engagement" variant="filled" color="primary" size="small" />
              <Chip label="Digital Strategy" variant="filled" color="default" size="small" />
            </Box>

            <Button variant="outlined" color="secondary" size="large">See details</Button>
          </LessSimpleCard>

          <LessSimpleCard elevation={1}>
            <Box sx={{ mb: 'var(--theme-spacing-md)' }}>
              <CardHeader title="CloudSync" subheader="Data storage & backup solutions" sx={{ p: 0 }} />
            </Box>

            <Typography
              variant="body1"
              sx={{
                fontFamily: 'var(--theme-font-family-inter)',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--theme-text-primary)',
                mb: 'var(--theme-spacing-md)'
              }}
            >
              Secure your data with scalable cloud solutions. Enjoy automatic backups and 24/7 access to your files from anywhere in the world.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--theme-spacing-sm)',
                mb: 'var(--theme-spacing-lg)'
              }}
            >
              <Chip label="Data Management" variant="filled" color="secondary" size="small" />
              <Chip label="Security & Backup" variant="filled" color="warning" size="small" />
              <Chip label="Cloud Services" variant="filled" color="default" size="small" />
            </Box>

            <Button variant="contained" color="warning" size="large">See details</Button>
          </LessSimpleCard>

          <LessSimpleCard elevation={1}>
            <Box sx={{ mb: 'var(--theme-spacing-md)' }}>
              <CardHeader title="WebWiz" subheader="Website design & development" sx={{ p: 0 }} />
            </Box>

            <Typography
              variant="body1"
              sx={{
                fontFamily: 'var(--theme-font-family-inter)',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'var(--theme-text-primary)',
                mb: 'var(--theme-spacing-md)'
              }}
            >
              Create stunning, responsive websites tailored for your business needs. Full-stack development ensures a seamless user experience from start to finish.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--theme-spacing-sm)',
                mb: 'var(--theme-spacing-lg)'
              }}
            >
              <Chip label="Web Development" variant="filled" color="info" size="small" />
              <Chip label="Design & UX" variant="outlined" color="success" size="small" />
              <Chip label="Technology" variant="filled" color="default" size="small" />
            </Box>

            <Button variant="contained" color="error" size="large">See details</Button>
          </LessSimpleCard>
        </Box>

    </Container>
  )
}

export default Organizations


