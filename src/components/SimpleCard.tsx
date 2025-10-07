import React from 'react'
import { Box, Paper, Typography, Chip, Button } from './local'

interface Action {
  label: string
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  onClick?: () => void
}

export interface SimpleCardProps {
  title?: string
  subtitle?: string
  content?: string
  categories?: string[]
  buttonLabel?: string
  buttonVariant?: 'contained' | 'outlined' | 'text'
  buttonColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  showAvatar?: boolean
  avatarText?: string
  className?: string
  actions?: Action[]
}

const defaultCategories = [
  'Pricing & Underwriting',
  'Product & Operations',
  'Technology',
]

const SimpleCard: React.FC<SimpleCardProps> = ({
  title = 'Card Title',
  subtitle = 'Card Subtitle',
  content = 'SchemeServe gives you the confidence to build your own schemes, and beat your competitors to market.',
  categories = defaultCategories,
  buttonLabel = 'See details',
  buttonVariant = 'outlined',
  buttonColor = 'primary',
  showAvatar = false,
  avatarText = 'H',
  className = '',
  actions,
}) => {
  const resolvedActions: Action[] = actions ?? [
    { label: buttonLabel, variant: buttonVariant, color: buttonColor },
  ]

  return (
    <Paper
      elevation={1}
      className={`flex flex-col items-start justify-start relative w-full ${className}`}
      sx={{
        backgroundColor: 'var(--theme-background-paper)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow:
          '0px 1px 3px 0px rgba(0,0,0,0.12), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.20)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '24px',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', width: '100%' }}>
          {showAvatar && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'var(--theme-action-selected)',
                color: 'var(--theme-text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {avatarText?.slice(0, 1).toUpperCase()}
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'var(--theme-font-family-nunito)',
                fontSize: '24px',
                fontWeight: 400,
                lineHeight: 1.167,
                color: 'var(--theme-text-primary)',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'var(--theme-font-family-inter)',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: 1.43,
                color: 'var(--theme-text-secondary)',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Box>

        {content && (
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'var(--theme-font-family-inter)',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'var(--theme-text-primary)'
            }}
          >
            {content}
          </Typography>
        )}

        {categories.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              width: '100%',
            }}
          >
            {categories.map((label, index) => (
              <Chip
                key={`${label}-${index}`}
                label={label}
                size="small"
                variant="filled"
                sx={{
                  fontFamily: 'var(--theme-font-family-inter)',
                  fontSize: '0.8125rem',
                  lineHeight: '18px',
                  borderRadius: '16px',
                  height: '24px',
                  margin: 0,
                  '& .MuiChip-label': { padding: '0 8px' },
                }}
              />
            ))}
          </Box>
        )}

        {resolvedActions.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              width: '100%',
            }}
          >
            {resolvedActions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outlined'}
                color={action.color || 'primary'}
                size="large"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default SimpleCard


