import React from "react"
import CustomCardNewFlat, { CustomCardNewFlatProps } from "./CustomCardNewFlat"
import figma from "@figma/code-connect"

/**
 * Adapter exposes simple Figma props and composes them into the component's
 * `categories` and `actions` shapes.
 */

type AdapterProps = Omit<CustomCardNewFlatProps, "categories" | "actions" | "categoryColors" | "categoryVariants"> & {
  category1?: string
  category2?: string
  category3?: string
  category1Color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
  category2Color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
  category3Color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
  buttonLabel?: string
  buttonVariant?: "contained" | "outlined" | "text"
  buttonColor?: "primary" | "secondary" | "error" | "warning" | "info" | "success"
}

const CustomCardNewFlatAdapter: React.FC<AdapterProps> = (props) => {
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
  } = props

  const categories: string[] = []
  const categoryColors: NonNullable<CustomCardNewFlatProps["categoryColors"]> = []
  const categoryVariants: NonNullable<CustomCardNewFlatProps["categoryVariants"]> = []

  const pushCategory = (label?: string, color?: AdapterProps["category1Color"]) => {
    if (!label) return
    categories.push(label)
    categoryColors.push(color || "default")
    categoryVariants.push("filled")
  }

  pushCategory(category1, category1Color)
  pushCategory(category2, category2Color)
  pushCategory(category3, category3Color)

  const actions = buttonLabel
    ? [
        {
          label: buttonLabel,
          variant: buttonVariant || "outlined",
          color: buttonColor || "primary",
        },
      ]
    : []

  return (
    <CustomCardNewFlat
      {...rest}
      categories={categories}
      categoryColors={categoryColors}
      categoryVariants={categoryVariants}
      actions={actions}
    />
  )
}

figma.connect(
  CustomCardNewFlatAdapter,
  "https://www.figma.com/design/KLNk6eJCBd573J4Qi5oHVs/Accelerant-MUI-DS-test?node-id=15838%3A7351",
  {
    props: {
      title: figma.string("title"),
      subtitle: figma.string("subtitle"),
      content: figma.string("Content"),
      usageText: figma.string("usageText"),
      category1: figma.string("category1"),
      category2: figma.string("category2"),
      category3: figma.string("category3"),
      category1Color: figma.enum("category1Color", {
        default: "default",
        primary: "primary",
        secondary: "secondary",
        error: "error",
        info: "info",
        success: "success",
        warning: "warning",
      }),
      category2Color: figma.enum("category2Color", {
        default: "default",
        primary: "primary",
        secondary: "secondary",
        error: "error",
        info: "info",
        success: "success",
        warning: "warning",
      }),
      category3Color: figma.enum("category3Color", {
        default: "default",
        primary: "primary",
        secondary: "secondary",
        error: "error",
        info: "info",
        success: "success",
        warning: "warning",
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
      showPlaceholder: figma.boolean("showPlaceholder"),
      imageUrl: figma.string("imageUrl"),
    },
    example: () => (
      <CustomCardNewFlatAdapter
        title="ExpertPEO"
        subtitle="Broker for PEO services"
        content="Get top-tier PEO services at zero cost. 13 PEOs compete to cut your costs—save big on benefits, comp, and payroll without switching carriers."
        usageText="Used by 10+ Members"
        category1="Pricing & Underwriting"
        category2="Product & Operations"
        category3="Technology"
        category1Color="default"
        category2Color="default"
        category3Color="default"
        buttonLabel="See details"
        buttonVariant="outlined"
        buttonColor="primary"
        showPlaceholder
      />
    ),
  },
)


