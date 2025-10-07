import React from 'react'
import { Typography, Box, Chip, Button, Paper } from './local'
import { PhotoOutlined } from './icons'

interface Action {
  label: string
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  onClick?: () => void
}

export interface CustomCardNewFlatProps {
  title?: string
  subtitle?: string
  content?: string
  categories?: string[]
  /** Optional small helper text shown above the categories row */
  usageText?: string
  /** Optional per-category chip colors aligned by index */
  categoryColors?: Array<'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'>
  /** Optional per-category chip variants aligned by index */
  categoryVariants?: Array<'filled' | 'outlined'>
  imageUrl?: string
  showPlaceholder?: boolean
  actions?: Action[]
  className?: string
}

const defaultCategories = [
  'Pricing & Underwriting',
  'Product & Operations',
  'Technology',
]

const CustomCardNewFlat: React.FC<CustomCardNewFlatProps> = ({
  title = 'Test Title',
  subtitle = 'Test Subtitle',
  content = 'SchemeServe gives you the confidence to build your own schemes, and beat your competitors to market. ',
  categories = defaultCategories,
  usageText = 'Used by 10+ Members',
  categoryColors = [],
  categoryVariants = [],
  imageUrl,
  showPlaceholder = false,
  actions = [{ label: 'See details', variant: 'outlined', color: 'primary' }],
  className = '',
}) => {
  return (
    <Paper
      elevation={1}
      className={`flex flex-col items-start justify-start relative w-full ${className}`}
      sx={{
        backgroundColor: 'var(--theme-background-paper)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.12), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.20)',
      }}
    >
      {(imageUrl || showPlaceholder) && (
        <Box
          className="relative w-full h-48 overflow-hidden"
          sx={{
            backgroundColor: showPlaceholder ? 'var(--theme-action-active)' : 'transparent',
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title || 'Card image'}
              className="w-full h-full object-cover"
            />
          ) : (
            <Box
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              sx={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PhotoOutlined width={40} height={40} color="var(--theme-background-paper)" />
            </Box>
          )}
        </Box>
      )}

      <Box
        sx={{
          padding: '24px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {title && (
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'var(--theme-typography-fontFamily)',
                fontSize: 'var(--theme-typography-_fontSize-1.5rem)',
                fontWeight: 'var(--theme-typography-fontWeightRegular)',
                lineHeight: 1.167,
                color: 'var(--theme-text-primary)',
                margin: 0,
                padding: 0,
              }}
            >
              {title}
            </Typography>
          )}

          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'var(--theme-typography-fontFamily)',
                fontSize: 'var(--theme-typography-_fontSize-0.875rem)',
                fontWeight: 'var(--theme-typography-fontWeightRegular)',
                lineHeight: 1.43,
                color: 'var(--theme-text-secondary)',
                margin: 0,
                padding: 0,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {content && (
          <Box sx={{ marginBottom: '24px' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'var(--theme-typography-fontFamily)',
                fontSize: 'var(--theme-typography-_fontSize-1rem)',
                fontWeight: 'var(--theme-typography-fontWeightRegular)',
                lineHeight: 1.5,
                color: 'var(--theme-text-primary)',
                margin: 0,
                padding: 0,
              }}
            >
              {content}
            </Typography>
          </Box>
        )}

        {usageText && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              marginBottom: '8px',
              color: 'var(--theme-text-secondary)',
            }}
          >
            {usageText}
          </Typography>
        )}

        {categories.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '24px',
            }}
          >
            {categories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                variant={categoryVariants[index] || 'filled'}
                color={categoryColors[index] || 'default'}
                size="small"
                sx={{
                  fontFamily: 'var(--theme-typography-fontFamily)',
                  fontSize: 'var(--theme-typography-_fontSize-0.8125rem)',
                  fontWeight: 'var(--theme-typography-fontWeightRegular)',
                  lineHeight: '18px',
                  borderRadius: '16px',
                  height: '24px',
                  margin: 0,
                  '& .MuiChip-label': {
                    padding: '0 8px',
                  },
                }}
              />
            ))}
          </Box>
        )}

        {actions.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              width: '100%',
            }}
          >
            {actions.map((action, index) => (
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

export default CustomCardNewFlat


