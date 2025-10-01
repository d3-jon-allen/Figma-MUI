# MUI Component Library with Design Tokens

A React component library built with Material-UI (MUI) and integrated with a comprehensive design token system.

## 🎨 Design Token System

This project uses CSS Custom Properties (CSS variables) to implement design tokens, ensuring consistent styling across all components.

### Token Categories

- **Colors**: Primary, secondary, success, error, warning, info, text, background, and action colors
- **Typography**: Font families (Inter, Nunito, Roboto, Roboto Mono)
- **Spacing**: Consistent spacing scale (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)
- **Shadows**: Predefined shadow values for elevation
- **Border Radius**: Consistent border radius values

### Using Design Tokens

#### In CSS/SCSS
```css
.my-component {
  background-color: var(--color-primary-main);
  padding: var(--spacing-lg);
  font-family: var(--font-family-inter);
  box-shadow: var(--shadow-1);
}
```

#### In MUI sx prop
```tsx
<Box
  sx={{
    backgroundColor: 'var(--color-card-background)',
    padding: 'var(--spacing-lg)',
    fontFamily: 'var(--font-family-nunito)',
    boxShadow: 'var(--color-card-shadow)'
  }}
>
  Content
</Box>
```

### Regenerating Tokens

When you update your design tokens in Figma or modify the `mergedTokens.json` file, regenerate the CSS:

```bash
npm run tokens
```

This will update `src/tokens/tokens.css` with the latest token values.

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── icons/          # SVG icon components (103 icons)
│   ├── local/          # Local MUI component wrappers
│   └── CustomCardNew.tsx # Example card component
├── tokens/             # Design token definitions
│   ├── mergedTokens.json # Source of truth for tokens
│   └── tokens.css      # Generated CSS custom properties
└── App.tsx             # Main application with examples
```

## 🎯 Key Features

- **103 SVG Icons**: All converted to React components with consistent API
- **Design Token Integration**: CSS custom properties for consistent styling
- **MUI Integration**: Built on top of Material-UI with local component wrappers
- **TypeScript Support**: Full type safety throughout the codebase
- **Responsive Design**: Mobile-first approach with MUI's Grid system

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run tokens` - Regenerate CSS tokens from mergedTokens.json
- `npm run storybook` - Launch Storybook for component development

## 🎨 Icon System

All 103 SVG icons are available as React components with consistent props:

```tsx
import { PhotoOutlined, AddFilled, CheckFilled } from './components/local';

<PhotoOutlined color="var(--color-primary-main)" width={32} height={32} />
<AddFilled color="var(--color-error-main)" />
<CheckFilled className="my-icon-class" />
```

## 📱 Component Examples

### CustomCard Component
A fully-featured card component showcasing the design system:

```tsx
<CustomCardNew
  title="Design System Card"
  subtitle="Built with Figma tokens"
  content="This card showcases the complete design system with proper typography, spacing, and components."
  categories={["Design", "System", "Figma"]}
  showPlaceholder={true}
  actions={[
    { label: "See details", variant: "outlined", color: "primary" }
  ]}
/>
```

## 🔄 Token Workflow

1. **Design in Figma** → Tokens exported to JSON
2. **Merge tokens** → Combined into `mergedTokens.json`
3. **Generate CSS** → `npm run tokens` creates `tokens.css`
4. **Use in components** → Reference CSS custom properties
5. **Update automatically** → Changes flow from Figma to components

## 🌙 Dark Mode Support

The token system includes dark mode support through CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background-default: #121212;
    --color-text-primary: #ffffffde;
  }
}
```

## 📚 Resources

- [Material-UI Documentation](https://mui.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Design Tokens](https://www.designtokens.org/)
