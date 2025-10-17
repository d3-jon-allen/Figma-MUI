import React from 'react'
import { styled } from '@mui/material/styles'
import MuiBreadcrumbs, { BreadcrumbsProps as MuiBreadcrumbsProps } from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export interface CrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps extends Omit<MuiBreadcrumbsProps, 'separator'> {
  items: CrumbItem[]
  separator?: React.ReactNode
}

const StyledBreadcrumbs = styled(MuiBreadcrumbs)(() => ({
  '& .MuiBreadcrumbs-separator': {
    margin: '0 8px',
    color: 'var(--theme-text-secondary)',
    fontFamily: 'var(--theme-typography-fontFamily)',
    fontSize: 'var(--theme-typography-_fontSize-rem_1, 16px)',
    lineHeight: 1.5,
  },
  '& a.MuiLink-root': {
    color: 'var(--theme-text-secondary)',
    textDecoration: 'none',
    fontFamily: 'var(--theme-typography-fontFamily)',
    fontWeight: 'var(--theme-typography-fontWeightRegular)',
    fontSize: 'var(--theme-typography-_fontSize-rem_1, 16px)',
    '&:hover': { textDecoration: 'underline' },
  },
  '& .MuiTypography-root': {
    color: 'var(--theme-text-secondary)',
    fontFamily: 'var(--theme-typography-fontFamily)',
    fontWeight: 'var(--theme-typography-fontWeightRegular)',
    fontSize: 'var(--theme-typography-_fontSize-rem_1, 16px)',
  },
}))

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator, ...rest }) => {
  const sep = separator ?? <ChevronRightIcon sx={{ fontSize: 18, color: 'var(--theme-text-secondary)' }} />

  const lastIndex = items.length - 1
  return (
    <StyledBreadcrumbs separator={sep} {...rest}>
      {items.map((item, idx) => {
        const isLast = idx === lastIndex
        if (!isLast && item.href) {
          return (
            <Link key={idx} href={item.href} underline="hover">
              {item.label}
            </Link>
          )
        }
        return (
          <Typography key={idx} color="text.secondary">
            {item.label}
          </Typography>
        )
      })}
    </StyledBreadcrumbs>
  )
}

export default Breadcrumb


