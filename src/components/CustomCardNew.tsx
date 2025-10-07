import React from 'react'
import { Typography, Box, Chip, Button, Paper } from './local'
import { PhotoOutlined } from './icons'

interface Action {
  label: string
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
  onClick?: () => void
}

interface CustomCardProps {
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

const CustomCardNew: React.FC<CustomCardProps> = ({ 
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
  className = "",
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
      {/* Image Header Section */}
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

      {/* Content Section */}
      <Box
        sx={{
          padding: '24px',
          width: '100%',
        }}
      >
        {/* Header Section */}
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--theme-spacing-sm)',
            marginBottom: 'var(--theme-spacing-lg)'
          }}
        >
          {title && (
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'var(--theme-typography-fontFamily)', // Inter from tokens
                fontSize: 'var(--theme-typography-_fontSize-1.5rem)', // 24px from tokens
                fontWeight: 'var(--theme-typography-fontWeightRegular)', // 400 from tokens
                lineHeight: 1.167,
                color: 'var(--theme-text-primary)',
                margin: 0,
                padding: 0
              }}
            >
              {title}
            </Typography>
          )}
          
          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'var(--theme-typography-fontFamily)', // Inter from tokens
                fontSize: 'var(--theme-typography-_fontSize-0.875rem)', // 14px from tokens
                fontWeight: 'var(--theme-typography-fontWeightRegular)', // 400 from tokens
                lineHeight: 1.43,
                color: 'var(--theme-text-secondary)',
                margin: 0,
                padding: 0
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {/* Content Text */}
        {content && (
          <Box sx={{ marginBottom: '24px' }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'var(--theme-typography-fontFamily)', // Inter from tokens
                fontSize: 'var(--theme-typography-_fontSize-1rem)', // 16px from tokens
                fontWeight: 'var(--theme-typography-fontWeightRegular)', // 400 from tokens
                lineHeight: 1.5,
                color: 'var(--theme-text-primary)',
                margin: 0,
                padding: 0
              }}
            >
              {content}
            </Typography>
          </Box>
        )}

        {/* Usage text */}
        {usageText && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              marginBottom: 'var(--theme-spacing-sm)',
              color: 'var(--theme-text-secondary)'
            }}
          >
            {usageText}
          </Typography>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <Box 
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--theme-spacing-sm)',
              marginBottom: 'var(--theme-spacing-lg)'
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
                  fontFamily: 'var(--theme-typography-fontFamily)', // Inter from tokens
                  fontSize: 'var(--theme-typography-_fontSize-0.8125rem)', // 13px from tokens
                  fontWeight: 'var(--theme-typography-fontWeightRegular)', // 400 from tokens
                  lineHeight: '18px',
                  borderRadius: '16px',
                  height: '24px',
                  margin: 0,
                  '& .MuiChip-label': {
                    padding: '0 8px'
                  }
                }}
              />
            ))}
          </Box>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 'var(--theme-spacing-sm)',
              width: '100%'
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

export default CustomCardNew
