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
const MUI_TOKENS_DIR = path.join(TOKENS_DIR, 'mui-tokens');
const OUTPUT_PATH = path.join(TOKENS_DIR, 'theme.css');

// flatten a nested token object (taking only .value leaves) to path -> raw value
function flatten(obj, prefix = []) {
  const out = {};
  for (const [k, v] of Object.entries(obj || {})) {
    if (v && typeof v === 'object' && 'value' in v) {
      out[[...prefix, k].join('/')] = v.value;
    } else if (v && typeof v === 'object') {
      Object.assign(out, flatten(v, [...prefix, k]));
    }
  }
  return out;
}

// resolve {group.key} references using primitives/palette within the same raw export
function resolveRefs(rawValue, rawTokens, modePalette) {
  if (typeof rawValue === 'string' && /^\{[^}]+\}$/.test(rawValue)) {
    const ref = rawValue.slice(1, -1);
    const [group, key] = ref.split('.');
    let candidate;
    // within current mode palette (e.g., background.paper-elevation-4 or divider)
    if (modePalette) {
      candidate = key !== undefined ? modePalette[group]?.[key] : modePalette[group];
    }
    // direct top-level group
    if (candidate === undefined) {
      candidate = key !== undefined ? rawTokens[group]?.[key] : rawTokens[group];
    }
    // primitives fallback
    if (candidate === undefined && rawTokens['material/colors/Primitives']?.[group]) {
      candidate = rawTokens['material/colors/Primitives'][group][key];
    }
    const value = (candidate && typeof candidate === 'object' && 'value' in candidate) ? candidate.value : candidate;
    return value !== undefined ? value : rawValue;
  }
  return rawValue;
}

function emitMode(selector, modeKey, raw) {
  const lines = [];
  lines.push(`${selector} {`);
  const palette = raw[`palette/${modeKey}`] || {};
  const flatPalette = flatten(palette);
  for (const [pathKey, rawVal] of Object.entries(flatPalette)) {
    const cssName = `--palette-${modeKey.toLowerCase()}-${pathKey.replace(/[\\/]/g, '-').toLowerCase()}`;
    const val = resolveRefs(rawVal, raw, palette);
    lines.push(`  ${cssName}: ${val};`);
  }

  // emit global spacing variables and friendly aliases once (in :root)
  if (selector === ':root') {
    const spacingGlobal = raw['spacing/Global'];
    if (spacingGlobal) {
      const flatSpacing = flatten(spacingGlobal);
      for (const [k, rawVal] of Object.entries(flatSpacing)) {
        const key = k.replace(/[\\/]/g, '-').toLowerCase();
        const val = typeof rawVal === 'number' ? `${rawVal}px` : rawVal;
        lines.push(`  --spacing-global-${key}: ${val};`);
      }
      // aliases commonly used by components
      lines.push(`  --theme-spacing-xs: var(--spacing-global-05);`);
      lines.push(`  --theme-spacing-sm: var(--spacing-global-1);`);
      lines.push(`  --theme-spacing-md: var(--spacing-global-2);`);
      lines.push(`  --theme-spacing-lg: var(--spacing-global-3);`);
      lines.push(`  --theme-spacing-xl: var(--spacing-global-4);`);
      lines.push(`  --theme-spacing-xxl: var(--spacing-global-6);`);
    }

    // shape (border radius)
    const shapeGlobal = raw['shape/Global'];
    if (shapeGlobal) {
      const flatShape = flatten(shapeGlobal);
      for (const [k, rawVal] of Object.entries(flatShape)) {
        const key = k.replace(/[\\/]/g, '-').toLowerCase();
        const val = typeof rawVal === 'number' ? `${rawVal}px` : rawVal;
        lines.push(`  --shape-global-${key}: ${val};`);
      }
      lines.push(`  --theme-border-radius-default: var(--shape-global-borderradius);`);
    }
  }

  // alias layer used by components
  const mode = modeKey.toLowerCase();
  const ns = `--palette-${mode}-`;
  lines.push(`  --theme-page-background: var(${ns}background-default);`);
  lines.push(`  --theme-paper-background: var(${ns}background-paper-elevation-0);`);
  lines.push(`  --theme-secondary-background: var(${ns}background-secondary, ${mode === 'light' ? '#fcfcfd' : '#2d2d2d'});`);
  // elevation-aware paper background aliases (0-24)
  for (let i = 0; i <= 24; i++) {
    lines.push(`  --theme-paper-background-elevation-${i}: var(${ns}background-paper-elevation-${i});`);
  }
  lines.push(`  --theme-text-primary: var(${ns}text-primary);`);
  lines.push(`  --theme-text-secondary: var(${ns}text-secondary);`);
  lines.push(`  --theme-text-disabled: var(${ns}text-disabled);`);
  lines.push(`  --theme-action-active: var(${ns}action-active);`);
  lines.push(`  --theme-action-hover: var(${ns}action-hover);`);
  lines.push(`  --theme-action-selected: var(${ns}action-selected);`);
  lines.push(`  --theme-action-disabled: var(${ns}action-disabled);`);
  lines.push(`  --theme-action-focus: var(${ns}action-focus);`);
  lines.push(`  --theme-action-disabledBackground: var(${ns}action-disabledbackground);`);
  lines.push(`  --theme-primary-main: var(${ns}primary-main);`);
  lines.push(`  --theme-primary-light: var(${ns}primary-light);`);
  lines.push(`  --theme-primary-dark: var(${ns}primary-dark);`);
  lines.push(`  --theme-primary-contrastText: var(${ns}primary-contrasttext);`);
  lines.push(`  --theme-secondary-main: var(${ns}secondary-main);`);
  lines.push(`  --theme-secondary-light: var(${ns}secondary-light);`);
  lines.push(`  --theme-secondary-dark: var(${ns}secondary-dark);`);
  lines.push(`  --theme-secondary-contrastText: var(${ns}secondary-contrasttext);`);
  lines.push(`  --theme-success-main: var(${ns}success-main);`);
  lines.push(`  --theme-success-light: var(${ns}success-light);`);
  lines.push(`  --theme-success-dark: var(${ns}success-dark);`);
  lines.push(`  --theme-success-contrastText: var(${ns}success-contrasttext);`);
  lines.push(`  --theme-error-main: var(${ns}error-main);`);
  lines.push(`  --theme-error-light: var(${ns}error-light);`);
  lines.push(`  --theme-error-dark: var(${ns}error-dark);`);
  lines.push(`  --theme-error-contrastText: var(${ns}error-contrasttext);`);
  lines.push(`  --theme-warning-main: var(${ns}warning-main);`);
  lines.push(`  --theme-warning-light: var(${ns}warning-light);`);
  lines.push(`  --theme-warning-dark: var(${ns}warning-dark);`);
  lines.push(`  --theme-warning-contrastText: var(${ns}warning-contrasttext);`);
  lines.push(`  --theme-info-main: var(${ns}info-main);`);
  lines.push(`  --theme-info-light: var(${ns}info-light);`);
  lines.push(`  --theme-info-dark: var(${ns}info-dark);`);
  lines.push(`  --theme-info-contrastText: var(${ns}info-contrasttext);`);
  lines.push(`  --theme-divider: var(${ns}divider);`);
  // convenient alias for outlines used in examples
  lines.push(`  --theme-border: var(${ns}divider);`);

  // component-specific aliases: Chip (map to design tokens)
  lines.push(`  --chip-default-fill: var(${ns}_components-chip-defaultfill);`);
  lines.push(`  --chip-default-hover-fill: var(${ns}_components-chip-defaulthoverfill);`);
  lines.push(`  --chip-default-focus-fill: var(${ns}_components-chip-defaultfocusfill);`);
  lines.push(`  --chip-default-enabled-border: var(${ns}_components-chip-defaultenabledborder);`);
  lines.push(`  --chip-default-close-fill: var(${ns}_components-chip-defaultclosefill);`);

  // typography aliases (mode-independent, but emitted per block for simplicity)
  lines.push(`  --theme-font-family-inter: 'Inter', sans-serif;`);
  lines.push(`  --theme-font-family-nunito: 'Nunito', sans-serif;`);
  lines.push(`  --theme-font-family-roboto: 'Roboto', sans-serif;`);

  // Common variant mappings used by local Typography
  lines.push(`  --theme-typography-h1-fontFamily: var(--theme-font-family-nunito);`);
  lines.push(`  --theme-typography-h1-fontSize: 2rem;`);
  lines.push(`  --theme-typography-h1-fontWeight: 600;`);
  lines.push(`  --theme-typography-h1-lineHeight: 1.167;`);

  lines.push(`  --theme-typography-h2-fontFamily: var(--theme-font-family-nunito);`);
  lines.push(`  --theme-typography-h2-fontSize: 1.5rem;`);
  lines.push(`  --theme-typography-h2-fontWeight: 600;`);
  lines.push(`  --theme-typography-h2-lineHeight: 1.2;`);

  lines.push(`  --theme-typography-h3-fontFamily: var(--theme-font-family-nunito);`);
  lines.push(`  --theme-typography-h3-fontSize: 1.25rem;`);
  lines.push(`  --theme-typography-h3-fontWeight: 600;`);
  lines.push(`  --theme-typography-h3-lineHeight: 1.2;`);

  lines.push(`  --theme-typography-h6-fontFamily: var(--theme-font-family-inter);`);
  lines.push(`  --theme-typography-h6-fontSize: 1rem;`);
  lines.push(`  --theme-typography-h6-fontWeight: 600;`);
  lines.push(`  --theme-typography-h6-lineHeight: 1.25;`);

  lines.push(`  --theme-typography-body1-fontFamily: var(--theme-font-family-inter);`);
  lines.push(`  --theme-typography-body1-fontSize: 1rem;`);
  lines.push(`  --theme-typography-body1-fontWeight: 400;`);
  lines.push(`  --theme-typography-body1-lineHeight: 1.5;`);

  lines.push(`  --theme-typography-body2-fontFamily: var(--theme-font-family-inter);`);
  lines.push(`  --theme-typography-body2-fontSize: 0.875rem;`);
  lines.push(`  --theme-typography-body2-fontWeight: 400;`);
  lines.push(`  --theme-typography-body2-lineHeight: 1.43;`);

  lines.push('}');
  return lines.join('\n');
}

function buildComponentMappings() {
  const parts = [];
  parts.push(`/* Component Styles - Using aliases that reference theme-specific values */`);
  parts.push('');
  // Base Paper uses elevation-0 alias by default
  parts.push(`.MuiPaper-root {`);
  parts.push(`  background-color: var(--theme-paper-background-elevation-0, var(--theme-paper-background));`);
  parts.push(`  color: var(--theme-text-primary);`);
  parts.push(`}`);
  // Elevation-specific backgrounds
  for (let i = 1; i <= 24; i++) {
    parts.push(`.MuiPaper-root.MuiPaper-elevation${i} { background-color: var(--theme-paper-background-elevation-${i}, var(--theme-paper-background)); }`);
  }
  parts.push('');
  parts.push(`.MuiContainer-root { background-color: var(--theme-page-background); }`);
  parts.push(`.MuiTypography-root { color: inherit; }`);
  parts.push(`body { background-color: var(--theme-page-background); color: var(--theme-text-primary); }`);
  parts.push(`* { transition: background-color 0.3s ease, color 0.3s ease; }`);
  parts.push(`div[class*="MuiPaper-root"] { color: var(--theme-text-primary); }`);
  return parts.join('\n');
}

function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function main() {
  if (!fs.existsSync(MUI_TOKENS_DIR)) {
    console.error('❌ Tokens Studio directory not found at src/tokens/mui-tokens');
    process.exit(1);
  }

  // Compose a raw-like structure from Tokens Studio files
  const raw = {};
  const paletteLight = loadJson(path.join(MUI_TOKENS_DIR, 'palette', 'Light.json')) || {};
  const paletteDark = loadJson(path.join(MUI_TOKENS_DIR, 'palette', 'Dark.json')) || {};
  const spacingGlobal = loadJson(path.join(MUI_TOKENS_DIR, 'spacing', 'Global.json')) || {};
  const shapeGlobal = loadJson(path.join(MUI_TOKENS_DIR, 'shape', 'Global.json')) || {};
  const primitives = loadJson(path.join(MUI_TOKENS_DIR, 'material', 'colors', 'Primitives.json')) || {};

  raw['palette/Light'] = paletteLight;
  raw['palette/Dark'] = paletteDark;
  raw['spacing/Global'] = spacingGlobal;
  raw['shape/Global'] = shapeGlobal;
  raw['material/colors/Primitives'] = primitives;

  const parts = [];
  parts.push('/* Auto-generated from Tokens Studio (src/tokens/mui-tokens). Do not edit manually. */');
  parts.push('');
  parts.push(emitMode(':root', 'Light', raw));
  parts.push('');
  parts.push(emitMode('[data-theme="dark"]', 'Dark', raw));
  parts.push('');
  parts.push(buildComponentMappings());

  fs.writeFileSync(OUTPUT_PATH, parts.join('\n'));
  console.log(`✅ Generated ${OUTPUT_PATH}`);
}

main();


