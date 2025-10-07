import React from "react"
import CustomCardNewFlat, { CustomCardNewFlatProps } from "./CustomCardNewFlat"
import figma from "@figma/code-connect"

/**
 * Adapter exposes simple Figma props and composes them into the component's
 * `categories` and `actions` shapes.
 */

type AdapterProps = Omit<CustomCardNewFlatProps, "categories" | "actions"> & {
  category1?: string
  category2?: string
  category3?: string
  buttonLabel?: string
  buttonVariant?: "contained" | "outlined" | "text"
  buttonColor?: "primary" | "secondary" | "error" | "warning" | "info" | "success"
}

const CustomCardNewFlatAdapter: React.FC<AdapterProps> = (props) => {
  const {
    category1,
    category2,
    category3,
    buttonLabel,
    buttonVariant,
    buttonColor,
    ...rest
  } = props

  const categories = [category1, category2, category3].filter(Boolean) as string[]

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
      // Optional: expose imageUrl if your design passes a URL
      // imageUrl: figma.string("imageUrl"),
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
        buttonLabel="See details"
        buttonVariant="outlined"
        buttonColor="primary"
        showPlaceholder
      />
    ),
  },
)


