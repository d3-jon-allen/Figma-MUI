import React from 'react'
import { Box } from '@mui/material'
import { Typography, Button, Chip, Paper, Breadcrumb } from '../components/local'
import { useParams } from 'react-router-dom'
import { solutions } from '../data/solutions'

// Placeholder kept previously is now unused; remove to satisfy linter

const SolutionDetail: React.FC = () => {
  const { id } = useParams()
  const solution = solutions.find(s => s.id === Number(id))

  return (<>
        <Box sx={{ p: 5, backgroundColor: 'var(--theme-page-background)' }}>
          {/* Breadcrumbs */}
          <Box sx={{ mb: 2 }}>
            <Breadcrumb items={[
              { label: 'Demo Member One' },
              { label: 'Solutions exchange', href: '/solutions-exchange' },
              { label: solution?.title || 'SchemeServe' },
            ]} />
          </Box>

          {/* Header: title, subtitle, blurb, chips + right-aligned CTA */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="h3" sx={{ mb: 0.5, color: 'var(--theme-text-primary)' }}>
                {solution?.title || 'SchemeServe'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: 'var(--theme-text-secondary)' }}>
                {solution?.subtitle || 'Policy Admin System'}
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--theme-text-secondary)', mb: 2 }}>
                {solution?.heroBlurb || 'Build, launch, and manage insurance schemes fast—with full control, real-time automation, and same-day support included.'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {(solution?.chips || ['Pricing & Underwriting','Product & Operations','Technology']).map((c, i) => (
                  <Chip key={`${c}-${i}`} label={c} size="small" />
                ))}
              </Box>
            </Box>
            <Box sx={{ flexShrink: 0 }}>
              <Button color="primary" size="large" variant="contained">Send a request</Button>
            </Box>
          </Box>

        </Box>

          {/* Content section on secondary background */}
        <Box sx={{
      backgroundColor: 'var(--theme-secondary-background, #fcfcfd)',
      pt: 5, // 40px
      pb: 5,   // 40px
      px: 5
    }}>
      <Box sx={{ maxWidth: 600 }}>
        <Typography variant="h1" sx={{ mb: 2, color: 'var(--theme-text-primary)' }}>
          {solution?.heroHeadline || 'Launch and Manage Insurance Schemes Fast with Flexible, Real-Time Tools and Expert Support'}
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--theme-text-secondary)', mb: 5 }}>
          SchemeServe helps MGAs launch, manage, and adapt schemes fast—whether you build them yourself or with help from their expert team. Make real-time changes at no extra cost, streamline operations with API integrations, and get lightning-fast support. Trusted since 2000, SchemeServe is carbon negative, ISO-certified, and built for insurers who value speed, flexibility, and simplicity.
        </Typography>
      </Box>

      <Box sx={{ mb: 1 }}>
        <Typography variant="h2" sx={{ color: 'var(--theme-text-primary)' }}>Highlights</Typography>
      </Box>

      <Paper elevation={1} sx={{ p: 3, borderRadius: '12px', maxWidth: 600 }}>
        {(solution?.highlights || [
          { title: 'Build Schemes Fast, Your Way', body: 'Self-build with a no-code toolkit or collaborate with specialists to go live quickly. Keep full control from day one with transparent pricing—no surprise fees.' },
          { title: 'Edit Anything, Anytime — For Free', body: 'Update rating, documents, or workflows instantly without waiting on a release cycle. Make safe changes in minutes and move at market speed.' },
          { title: 'Smart Automation & Underwriting', body: 'Automate quotes, referrals, and renewals with configurable rules and triage. Use data-driven underwriting to reduce leakage and increase hit‑rate.' },
          { title: 'Powerful API Integrations', body: 'Connect to pricing engines, payment providers, CRMs, and data sources. Orchestrate your stack with reliable, well-documented APIs.' },
          { title: 'Built‑In Accounting with Digit', body: 'Reconcile premiums and bordereaux without spreadsheets. Automate postings and cut month‑end from days to hours.' }
        ]).map((item, idx) => (
          <Box key={idx} sx={{ mb: idx === (solution?.highlights?.length || 5) - 1 ? 0 : 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'var(--theme-text-primary)', fontWeight: 600 }}>{item.title}</Typography>
            <Typography variant="body2" sx={{ color: 'var(--theme-text-secondary)' }}>
              {item.body}
            </Typography>
          </Box>
        ))}
      </Paper>
        </Box>

  </>  )
  }

export default SolutionDetail


