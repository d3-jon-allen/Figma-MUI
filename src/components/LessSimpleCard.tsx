import React from 'react'
import { Paper, Typography, Box, Chip, Button, CardHeader } from './local'

export interface LessSimpleCardProps {
  content?: string
  elevation?: number
  className?: string
  children?: React.ReactNode
  // Nested content props (mirrors Figma adapter)
  title?: string
  subtitle?: string
  chips?: string[]
  chip1?: string
  chip2?: string
  chip3?: string
  buttonLabel?: string
  buttonVariant?: 'contained' | 'outlined' | 'text'
  buttonColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  onButtonClick?: () => void
}

const LessSimpleCard: React.FC<LessSimpleCardProps> = ({
  content = 'Get top-tier PEO services at zero cost. 13 PEOs compete to cut your costs—save big on benefits, comp, and payroll without switching carriers.',
  elevation = 1,
  className = '',
  children,
  title = 'InsCipher',
  subtitle = 'Agent onboarding & compliance',
  chips,
  chip1,
  chip2,
  chip3,
  buttonLabel = 'See details',
  buttonVariant = 'contained',
  buttonColor = 'primary',
  onButtonClick,
}) => {
  const computedChips: string[] = (chips && chips.length > 0)
    ? chips
    : ([chip1, chip2, chip3].filter(Boolean) as string[])

  const paperBg = `var(--theme-paper-background-elevation-${elevation}, var(--theme-paper-background))`

  return (
    <Paper
      elevation={elevation}
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '338px',
        backgroundColor: paperBg,
        borderRadius: 'var(--theme-border-radius-default)',
      }}
    >
      <Box sx={{ p: 'var(--theme-spacing-lg)', width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, height: '100%' }}>
        {children ? (
          children
        ) : (
          <>
            {(title || subtitle) && (
              <Box sx={{ mb: 'var(--theme-spacing-md)' }}>
                <CardHeader title={title} subheader={subtitle} sx={{ p: 0 }} />
              </Box>
            )}

            {content && (
              <Typography
                variant="body1"
                sx={{
                  mb: (computedChips.length > 0 || !!buttonLabel) ? 'var(--theme-spacing-md)' : 0,
                }}
              >
                {content}
              </Typography>
            )}

            {computedChips.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--theme-spacing-sm)',
                  mb: buttonLabel ? 'var(--theme-spacing-lg)' : 0,
                }}
              >
                {computedChips.map((label, i) => (
                  <Chip key={`${label}-${i}`} label={label} size="small" />
                ))}
              </Box>
            )}

            {buttonLabel && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                <Button variant={buttonVariant} color={buttonColor} size="large" onClick={onButtonClick}>
                  {buttonLabel}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Paper>
  )
}

export default LessSimpleCard


