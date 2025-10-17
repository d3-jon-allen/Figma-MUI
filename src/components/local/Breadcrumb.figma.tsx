import React from "react"
import Breadcrumb, { BreadcrumbProps } from "./Breadcrumb"
import figma from "@figma/code-connect"

figma.connect(
  Breadcrumb as React.ComponentType<BreadcrumbProps>,
  "https://www.figma.com/design/KLNk6eJCBd573J4Qi5oHVs/Accelerant-MUI-DS-test?node-id=11048%3A152651",
  {
    props: {
      // Accept comma-separated labels and optional hrefs via pairs label|href
      items: figma.string("items"),
      maxItems: figma.number("maxItems"),
    } as any,
    example: () => (
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Details" },
        ]}
        maxItems={8}
      />
    ),
    mapProps: (raw: any) => {
      const { items, ...rest } = raw || {}
      if (typeof items === 'string') {
        const parsed = items
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
          .map((p: string) => {
            const [label, href] = p.split('|').map((x) => x?.trim())
            return href ? { label, href } : { label }
          })
        return { ...rest, items: parsed }
      }
      return raw
    },
  },
)


