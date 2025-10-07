import React from "react"
import SimpleCard, { SimpleCardProps } from "./SimpleCard"
import figma from "@figma/code-connect"

type AdapterProps = Omit<SimpleCardProps, 'categories' | 'actions'> & {
  category1?: string
  category2?: string
  category3?: string
}

const SimpleCardAdapter: React.FC<AdapterProps> = (props) => {
  const { category1, category2, category3, ...rest } = props
  const categories = [category1, category2, category3].filter(Boolean) as string[]
  return <SimpleCard {...rest} categories={categories} />
}

figma.connect(
  SimpleCardAdapter,
  "https://www.figma.com/design/KLNk6eJCBd573J4Qi5oHVs/Accelerant-MUI-DS-test?node-id=15848%3A9940",
  {
    props: {
      title: figma.string("title"),
      subtitle: figma.string("subtitle"),
      content: figma.string("content"),
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
      showAvatar: figma.boolean("showAvatar"),
      avatarText: figma.string("avatarText"),
      category1: figma.string("category1"),
      category2: figma.string("category2"),
      category3: figma.string("category3"),
    },
    example: () => (
      <SimpleCardAdapter
        title="Card Title"
        subtitle="Card Subtitle"
        content="SchemeServe gives you the confidence to build your own schemes, and beat your competitors to market."
        category1="Pricing & Underwriting"
        category2="Product & Operations"
        category3="Technology"
        buttonLabel="See details"
        buttonVariant="outlined"
        buttonColor="primary"
        showAvatar={false}
        avatarText="H"
      />
    ),
  },
)


