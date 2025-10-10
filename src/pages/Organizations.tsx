import React from 'react'
import { Container, Box, Typography, Paper } from '../components/local'
import LessSimpleCard from '../components/LessSimpleCard'

const Organizations: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        Organizations
      </Typography>

      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'var(--theme-text-secondary)' }}>
          LessSimpleCard — rendered with Figma-like overrides
        </Typography>
        <Box>
          <LessSimpleCard
            elevation={1}
            title="InsCipher"
            subtitle="Agent onboarding & compliance"
            content="Get top-tier PEO services at zero cost. 13 PEOs compete to cut your costs—save big on benefits, comp, and payroll without switching carriers."
            chips={["Central Functions", "Product & Operations", "Technology"]}
            buttonLabel="See details"
            buttonVariant="contained"
            buttonColor="primary"
          />
        </Box>
      </Paper>
    </Container>
  )
}

export default Organizations


