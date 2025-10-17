import React from "react"
import Select from "./Select"
import figma from "@figma/code-connect"

figma.connect(
  Select,
  "https://www.figma.com/design/KLNk6eJCBd573J4Qi5oHVs/Accelerant-MUI-DS-test?node-id=11017%3A144316",
  {
    props: {
      label: figma.string("label"),
      value: figma.string("value"),
      size: figma.enum("size", { small: "small", medium: "medium" }),
      disabled: figma.boolean("disabled"),
    },
    example: () => (
      <Select
        label="Status"
        size="small"
        options={[
          { label: "All", value: "all" },
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]}
        value="all"
      />
    ),
  },
)


