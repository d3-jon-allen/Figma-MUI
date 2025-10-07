import React from "react"
import CustomCardNew from "./CustomCardNew"
import figma from "@figma/code-connect"

type ActionColor = "primary" | "secondary" | "error" | "warning" | "info" | "success"
type ChipColor = "default" | ActionColor

type AdapterProps = {
  title?: string
  subtitle?: string
  content?: string
  usageText?: string
  imageUrl?: string
  showPlaceholder?: boolean
  category1?: string
  category2?: string
  category3?: string
  category1Color?: ChipColor
  category2Color?: ChipColor
  category3Color?: ChipColor
  buttonLabel?: string
  buttonVariant?: "contained" | "outlined" | "text"
  buttonColor?: ActionColor
}

const CustomCardNewAdapter: React.FC<AdapterProps> = (p) => {
  const {
    category1,
    category2,
    category3,
    category1Color,
    category2Color,
    category3Color,
    buttonLabel,
    buttonVariant,
    buttonColor,
    ...rest
  } = p

  const categories: string[] = []
  const categoryColors: ChipColor[] = []
  const categoryVariants: Array<"filled" | "outlined"> = []

  const pushCategory = (label?: string, color?: ChipColor) => {
    if (!label) return
    categories.push(label)
    categoryColors.push(color || "default")
    categoryVariants.push("filled")
  }

  pushCategory(category1, category1Color)
  pushCategory(category2, category2Color)
  pushCategory(category3, category3Color)

  const actions = buttonLabel
    ? [{ label: buttonLabel, variant: buttonVariant || "outlined", color: buttonColor || "primary" }]
    : []

  return (
    <CustomCardNew
      {...rest}
      categories={categories}
      categoryColors={categoryColors}
      categoryVariants={categoryVariants}
      actions={actions}
    />
  )
}

figma.connect(
  CustomCardNewAdapter,
  "https://www.figma.com/design/KLNk6eJCBd573J4Qi5oHVs/Accelerant-MUI-DS-test?node-id=15702%3A108812",
  {
    props: {
      title: figma.string("title"),
      subtitle: figma.string("subtitle"),
      content: figma.string("Content"),
      usageText: figma.string("usageText"),
      imageUrl: figma.string("imageUrl"),
      showPlaceholder: figma.boolean("showPlaceholder"),
      category1: figma.string("category1"),
      category2: figma.string("category2"),
      category3: figma.string("category3"),
      category1Color: figma.enum("category1Color", {
        default: "default",
        primary: "primary",
        secondary: "secondary",
        error: "error",
        warning: "warning",
        info: "info",
        success: "success",
      }),
      category2Color: figma.enum("category2Color", {
        default: "default",
        primary: "primary",
        secondary: "secondary",
        error: "error",
        warning: "warning",
        info: "info",
        success: "success",
      }),
      category3Color: figma.enum("category3Color", {
        default: "default",
        primary: "primary",
        secondary: "secondary",
        error: "error",
        warning: "warning",
        info: "info",
        success: "success",
      }),
      buttonLabel: figma.string("buttonLabel"),
      buttonVariant: figma.enum("buttonVariant", {
        outlined: "outlined",
        contained: "contained",
        text: "text",
      }),
      buttonColor: figma.enum("buttonColor", {
        primary: "primary",
        secondary: "secondary",
        error: "error",
        warning: "warning",
        info: "info",
        success: "success",
      }),
    },
    example: () => (
      <CustomCardNewAdapter
        title="Example Title"
        subtitle="Example Subtitle"
        content="Example content"
        usageText="Used by 10+ Members"
        category1="Pricing & Underwriting"
        category2="Product & Operations"
        category3="Technology"
        category1Color="primary"
        category2Color="secondary"
        category3Color="default"
        buttonLabel="See details"
        buttonVariant="outlined"
        buttonColor="primary"
        showPlaceholder
      />
    ),
  },
)
