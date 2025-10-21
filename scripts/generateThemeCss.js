#!/usr/bin/env node

/**
 * Generate src/tokens/theme.css from mergedTokens.json
 * - Reads mergedTokens.json produced by scripts/mergeTokens.js
 * - Emits a single theme.css with :root and [data-theme="dark"] blocks
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKENS_DIR = path.join(__dirname, '..', 'src', 'tokens');
const MERGED_PATH = path.join(TOKENS_DIR, 'mergedTokens.json');
const OUTPUT_PATH = path.join(TOKENS_DIR, 'theme.css');

function ensure(value, fallback) {
  return value !== undefined && value !== null ? value : fallback;
}

function buildBlock(selector, tokens) {
  const { colors, text, background, action, divider } = tokens;
  const lines = [];
  lines.push(`${selector} {`);
  // component aliases
  lines.push(`  --theme-paper-background: ${ensure(background?.paper, '#ffffff')};`);
  lines.push(`  --theme-page-background: ${ensure(background?.default, '#ffffff')};`);
  lines.push(`  --theme-secondary-background: ${selector === ':root' ? '#fcfcfd' : '#2d2d2d'};`);
  lines.push(`  --theme-text-primary: ${ensure(text?.primary, selector === ':root' ? '#000000de' : '#ffffffde')};`);
  lines.push(`  --theme-text-secondary: ${ensure(text?.secondary, selector === ':root' ? '#00000099' : '#ffffffb3')};`);
  lines.push(`  --theme-text-disabled: ${ensure(text?.disabled, selector === ':root' ? '#00000061' : '#ffffff61')};`);
  // action
  lines.push(`  --theme-action-active: ${ensure(action?.active, selector === ':root' ? '#0000008f' : '#ffffff8f')};`);
  lines.push(`  --theme-action-hover: ${ensure(action?.hover, selector === ':root' ? '#0000000a' : '#ffffff14')};`);
  lines.push(`  --theme-action-selected: ${ensure(action?.selected, selector === ':root' ? '#00000014' : '#ffffff29')};`);
  lines.push(`  --theme-action-disabled: ${ensure(action?.disabled, selector === ':root' ? '#00000061' : '#ffffff61')};`);
  lines.push(`  --theme-action-focus: ${ensure(action?.focus, '#0000001f')};`);
  lines.push(`  --theme-action-disabledBackground: ${ensure(action?.disabledBackground, '#0000001f')};`);
  // palette
  lines.push(`  --theme-primary-main: ${ensure(colors?.primary?.main, '#2c49ef')};`);
  lines.push(`  --theme-primary-light: ${ensure(colors?.primary?.light, '#94b4ff')};`);
  lines.push(`  --theme-primary-dark: ${ensure(colors?.primary?.dark, '#182556')};`);
  lines.push(`  --theme-primary-contrastText: ${ensure(colors?.primary?.contrastText, selector === ':root' ? '#ffffff' : '#000000de')};`);
  lines.push(`  --theme-secondary-main: ${ensure(colors?.secondary?.main, selector === ':root' ? '#3ecfe2' : '#d5fbff')};`);
  lines.push(`  --theme-secondary-light: ${ensure(colors?.secondary?.light, selector === ':root' ? '#b9f7ff' : '#f0feff')};`);
  lines.push(`  --theme-secondary-dark: ${ensure(colors?.secondary?.dark, selector === ':root' ? '#228b99' : '#76efff')};`);
  lines.push(`  --theme-secondary-contrastText: ${ensure(colors?.secondary?.contrastText, selector === ':root' ? '#ffffff' : '#000000de')};`);
  lines.push(`  --theme-success-main: ${ensure(colors?.success?.main, selector === ':root' ? '#2e7d32' : '#66bb6a')};`);
  lines.push(`  --theme-success-light: ${ensure(colors?.success?.light, selector === ':root' ? '#4caf50' : '#c8e6c9')};`);
  lines.push(`  --theme-success-dark: ${ensure(colors?.success?.dark, selector === ':root' ? '#1b5e20' : '#388e3c')};`);
  lines.push(`  --theme-success-contrastText: ${ensure(colors?.success?.contrastText, selector === ':root' ? '#ffffff' : '#000000de')};`);
  lines.push(`  --theme-error-main: ${ensure(colors?.error?.main, selector === ':root' ? '#d32f2f' : '#f44336')};`);
  lines.push(`  --theme-error-light: ${ensure(colors?.error?.light, selector === ':root' ? '#ef5350' : '#ffcdd2')};`);
  lines.push(`  --theme-error-dark: ${ensure(colors?.error?.dark, '#c62828')};`);
  lines.push(`  --theme-error-contrastText: ${ensure(colors?.error?.contrastText, selector === ':root' ? '#ffffff' : '#ffffff')};`);
  lines.push(`  --theme-warning-main: ${ensure(colors?.warning?.main, selector === ':root' ? '#ef6c00' : '#ffa726')};`);
  lines.push(`  --theme-warning-light: ${ensure(colors?.warning?.light, selector === ':root' ? '#ff9800' : '#ffe0b2')};`);
  lines.push(`  --theme-warning-dark: ${ensure(colors?.warning?.dark, selector === ':root' ? '#e65100' : '#f57c00')};`);
  lines.push(`  --theme-warning-contrastText: ${ensure(colors?.warning?.contrastText, selector === ':root' ? '#ffffff' : '#000000de')};`);
  lines.push(`  --theme-info-main: ${ensure(colors?.info?.main, selector === ':root' ? '#0288d1' : '#29b6f6')};`);
  lines.push(`  --theme-info-light: ${ensure(colors?.info?.light, selector === ':root' ? '#03a9f4' : '#b3e5fc')};`);
  lines.push(`  --theme-info-dark: ${ensure(colors?.info?.dark, selector === ':root' ? '#01579b' : '#0288d1')};`);
  lines.push(`  --theme-info-contrastText: ${ensure(colors?.info?.contrastText, selector === ':root' ? '#ffffff' : '#000000de')};`);
  // spacing/border radius/static tokens
  lines.push(`  --theme-spacing-xs: 4px;`);
  lines.push(`  --theme-spacing-sm: 8px;`);
  lines.push(`  --theme-spacing-md: 16px;`);
  lines.push(`  --theme-spacing-lg: 24px;`);
  lines.push(`  --theme-spacing-xl: 32px;`);
  lines.push(`  --theme-spacing-xxl: 48px;`);
  lines.push(`  --theme-border-radius-default: 24px;`);
  lines.push(`  --theme-chip-background: ${selector === ':root' ? '#f5f5f5' : '#424242'};`);
  lines.push(`  --theme-chip-text: ${selector === ':root' ? '#333333' : '#ffffff'};`);
  lines.push(`  --theme-font-family-nunito: 'Nunito', sans-serif;`);
  lines.push(`  --theme-font-family-inter: 'Inter', sans-serif;`);
  lines.push(`  --theme-font-family-roboto: 'Roboto', sans-serif;`);
  // back-compat aliases and divider
  lines.push(`  --color-action-active: var(--theme-action-active);`);
  lines.push(`  --color-text-primary: var(--theme-text-primary);`);
  lines.push(`  --color-text-secondary: var(--theme-text-secondary);`);
  lines.push(`  --color-warning-contrastText: var(--theme-warning-contrastText);`);
  lines.push(`  --color-success-contrastText: var(--theme-success-contrastText);`);
  lines.push(`  --color-info-contrastText: var(--theme-info-contrastText);`);
  lines.push(`  --color-error-contrastText: var(--theme-error-contrastText);`);
  lines.push(`  --theme-divider: ${ensure(divider, selector === ':root' ? '#0000001f' : '#ffffff1f')};`);
  lines.push('}');
  return lines.join('\n');
}

function buildComponentMappings() {
  return `
/* Component Styles - Using aliases that reference theme-specific values */

.MuiPaper-root,
.MuiPaper-root.MuiPaper-elevation1,
.MuiPaper-root.MuiPaper-elevation2,
.MuiPaper-root.MuiPaper-elevation3,
.MuiPaper-root.MuiPaper-elevation4,
.MuiPaper-root.MuiPaper-elevation5,
.MuiPaper-root.MuiPaper-elevation6,
.MuiPaper-root.MuiPaper-elevation7,
.MuiPaper-root.MuiPaper-elevation8,
.MuiPaper-root.MuiPaper-elevation9,
.MuiPaper-root.MuiPaper-elevation10,
.MuiPaper-root.MuiPaper-elevation11,
.MuiPaper-root.MuiPaper-elevation12,
.MuiPaper-root.MuiPaper-elevation13,
.MuiPaper-root.MuiPaper-elevation14,
.MuiPaper-root.MuiPaper-elevation15,
.MuiPaper-root.MuiPaper-elevation16,
.MuiPaper-root.MuiPaper-elevation17,
.MuiPaper-root.MuiPaper-elevation18,
.MuiPaper-root.MuiPaper-elevation19,
.MuiPaper-root.MuiPaper-elevation20,
.MuiPaper-root.MuiPaper-elevation21,
.MuiPaper-root.MuiPaper-elevation22,
.MuiPaper-root.MuiPaper-elevation23,
.MuiPaper-root.MuiPaper-elevation24 {
  background-color: var(--theme-paper-background);
  color: var(--theme-text-primary);
}

.MuiContainer-root { background-color: var(--theme-page-background); }
.MuiTypography-root { color: inherit; }
body { background-color: var(--theme-page-background); color: var(--theme-text-primary); }
* { transition: background-color 0.3s ease, color 0.3s ease; }
div[class*="MuiPaper-root"] { background-color: var(--theme-paper-background); color: var(--theme-text-primary); }
`;
}

function main() {
  if (!fs.existsSync(MERGED_PATH)) {
    console.error('❌ mergedTokens.json not found. Run: npm run tokens:merge');
    process.exit(1);
  }
  const merged = JSON.parse(fs.readFileSync(MERGED_PATH, 'utf8'));
  const light = merged.modes?.light || { colors: merged.colors, text: merged.colors?.text, background: merged.colors?.background, action: merged.colors?.action, divider: merged.colors?.divider };
  const dark = merged.modes?.dark || null;

  const parts = [];
  parts.push('/* Auto-generated from mergedTokens.json. Do not edit manually. */');
  parts.push('');
  parts.push(buildBlock(':root', {
    colors: light.colors || merged.colors,
    text: light.text || merged.colors?.text,
    background: light.background || merged.colors?.background,
    action: light.action || merged.colors?.action,
    divider: light.divider || merged.colors?.divider
  }));
  if (dark) {
    parts.push('');
    parts.push(buildBlock('[data-theme="dark"]', {
      colors: dark.colors || merged.colors,
      text: dark.text,
      background: dark.background,
      action: dark.action,
      divider: dark.divider
    }));
  }
  parts.push('');
  parts.push(buildComponentMappings());

  fs.writeFileSync(OUTPUT_PATH, parts.join('\n'));
  console.log(`✅ Generated ${OUTPUT_PATH}`);
}

main();


