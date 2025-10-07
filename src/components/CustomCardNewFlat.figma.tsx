import React from "react"
import CustomCardNewFlat from "./CustomCardNewFlat"
import figma from "@figma/code-connect"

/**
 * -- Auto-generated mapping for detached variant --
 * Maps top-level props directly on the parent component.
 */

figma.connect(
  CustomCardNewFlat,
  "https://www.figma.com/design/KLNk6eJCBd573J4Qi5oHVs/Accelerant-MUI-DS-test?node-id=15838%3A7351",
  {
    props: {
      title: figma.string("title"),
      subtitle: figma.string("subtitle"),
      content: figma.string("Content"),
      usageText: figma.string("usageText"),
      // categories are shown as static examples in Figma; leave unmapped for now
    },
    example: (props) => (
      <CustomCardNewFlat
        title="Test Title"
        subtitle="Test Subtitle"
        content="SchemeServe gives you the confidence to build your own schemes, and beat your competitors to market. "
        usageText="Used by 10+ Members"
        categories={[
          "Pricing & Underwriting",
          "Product & Operations",
          "Technology",
        ]}
        actions={[{ label: "See details", variant: "outlined", color: "primary" }]}
      />
    ),
  },
)


