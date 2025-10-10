import React from "react"
import LessSimpleCard, { LessSimpleCardProps } from "./LessSimpleCard"
import figma from "@figma/code-connect"
import { Typography, Chip, Button, CardHeader, Box } from "./local"

type AdapterProps = LessSimpleCardProps & {
  elevation?: number | string
  title?: string
  subtitle?: string
  content?: string
  chip1?: string
  chip2?: string
  chip3?: string
  buttonLabel?: string
  buttonVariant?: "contained" | "outlined" | "text"
  buttonColor?: "primary" | "secondary" | "success" | "warning" | "error" | "info"
}

const LessSimpleCardAdapter: React.FC<AdapterProps> = (props) => {
  const {
    elevation,
    title,
    subtitle,
    content,
    chip1,
    chip2,
    chip3,
    buttonLabel,
    buttonVariant = "contained",
    buttonColor = "primary",
    ...rest
  } = props

  const chips = [chip1, chip2, chip3].filter(Boolean) as string[]

  const elevationNumber = typeof elevation === 'string' ? Number(elevation) : elevation

  return (
    <LessSimpleCard {...rest} elevation={elevationNumber}>
      {(title || subtitle) && (
        <Box sx={{ mb: 'var(--theme-spacing-md)' }}>
          <CardHeader title={title} subheader={subtitle} sx={{ p: 0 }} />
        </Box>
      )}

      {content && (
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'var(--theme-font-family-inter)',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: 'var(--theme-text-primary)',
            mb: chips.length || buttonLabel ? 'var(--theme-spacing-md)' : 0,
          }}
        >
          {content}
        </Typography>
      )}

      {chips.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--theme-spacing-sm)',
            mb: buttonLabel ? 'var(--theme-spacing-lg)' : 0,
          }}
        >
          {chips.map((label, i) => (
            <Chip key={`${label}-${i}`} label={label} size="small" />
          ))}
        </Box>
      )}

      {buttonLabel && (
        <Button variant={buttonVariant} color={buttonColor} size="large">
          {buttonLabel}
        </Button>
      )}
    </LessSimpleCard>
  )
}

figma.connect(
  LessSimpleCardAdapter,
  "https://www.figma.com/design/KLNk6eJCBd573J4Qi5oHVs/Accelerant-MUI-DS-test?node-id=15848%3A18999",
  {
    props: {
      elevation: figma.string("elevation"),
      title: figma.string("title"),
      subtitle: figma.string("subtitle"),
      content: figma.string("content"),
      chip1: figma.string("chip1"),
      chip2: figma.string("chip2"),
      chip3: figma.string("chip3"),
      buttonLabel: figma.string("buttonLabel"),
      buttonVariant: figma.enum("buttonVariant", { contained: "contained", outlined: "outlined", text: "text" }),
      buttonColor: figma.enum("buttonColor", {
        primary: "primary",
        secondary: "secondary",
        success: "success",
        warning: "warning",
        error: "error",
        info: "info",
      }),
    },
    example: () => (
      <LessSimpleCardAdapter
        elevation={1}
        title="InsCipher"
        subtitle="Agent onboarding & compliance"
        content="Get top-tier PEO services at zero cost..."
        chip1="Central Functions"
        chip2="Product & Operations"
        chip3="Technology"
        buttonLabel="See details"
        buttonVariant="contained"
        buttonColor="primary"
      />
    ),
  },
)


