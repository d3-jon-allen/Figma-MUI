#!/usr/bin/env node

/**
 * Token Merger Script
 * 
 * This script merges the Light.json color tokens with the Figma-extracted tokens
 * to create a complete design system that can be used by the Figma token sync.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const TOKENS_DIR = path.join(__dirname, '..', 'src', 'tokens');
const RAW_DIR = path.join(TOKENS_DIR, 'raw');
const OUTPUT_FILE = path.join(TOKENS_DIR, 'mergedTokens.json');

/**
 * Load tokens from a JSON file
 */
function loadTokens(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Error loading ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Resolve token references using actual values from primitives.json
 * e.g., {blue.400} -> #2c49ef
 */
function resolveTokenReferences(value, mode1Tokens) {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    // Extract the reference
    const ref = value.slice(1, -1); // Remove { and }
    
    // Parse the reference (e.g., "blue.400")
    const parts = ref.split('.');
    if (parts.length === 2) {
      const colorName = parts[0];
      const shade = parts[1];
      
      // Look up the actual color value
      if (mode1Tokens[colorName] && mode1Tokens[colorName][shade]) {
        const actualValue = mode1Tokens[colorName][shade].value;
        console.log(`🔄 Resolved ${ref} -> ${actualValue}`);
        return actualValue;
      }
    }
    
    console.warn(`⚠️ Could not resolve reference: ${ref}`);
    return value; // Return original if can't resolve
  }
  return value;
}

/**
 * Process tokens and resolve references
 */
function processTokens(tokens, mode1Tokens) {
  const processed = {};
  
  Object.entries(tokens).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      if (value.value !== undefined) {
        // This is a token with a value
        processed[key] = {
          ...value,
          value: resolveTokenReferences(value.value, mode1Tokens)
        };
      } else {
        // This is a nested object, process recursively
        processed[key] = processTokens(value, mode1Tokens);
      }
    } else {
      // This is a direct value
      processed[key] = resolveTokenReferences(value, mode1Tokens);
    }
  });
  
  return processed;
}

/**
 * Merge all token sources into a unified design system
 */
function mergeTokens() {
  console.log('🔄 Merging design tokens...\n');
  
  // Load the primitives.json core color tokens
  const mode1Tokens = loadTokens(path.join(RAW_DIR, 'primitives.json'));
  if (!mode1Tokens) {
    console.error('❌ Failed to load primitives.json');
    return;
  }
  console.log('✅ primitives.json loaded with core color values');
  
  // Load the Light.json color tokens
  const lightTokens = loadTokens(path.join(RAW_DIR, 'Light.json'));
  if (!lightTokens) {
    console.error('❌ Failed to load Light.json');
    return;
  }
  console.log('✅ Light.json loaded with color aliases');
  
  // Load the Dark.json color tokens
  const darkTokens = loadTokens(path.join(RAW_DIR, 'Dark.json'));
  if (!darkTokens) {
    console.error('❌ Failed to load Dark.json');
    return;
  }
  console.log('✅ Dark.json loaded with color aliases');
  
  // Load the Figma-extracted tokens
  const figmaTokens = loadTokens(path.join(RAW_DIR, 'figmaTokens.json'));
  if (!figmaTokens) {
    console.error('❌ Failed to load figmaTokens.json');
    return;
  }
  console.log('✅ figmaTokens.json loaded with Figma-extracted values');
  
  // Process and resolve references in Light.json and Dark.json using primitives.json values
  console.log('🔄 Processing Light.json tokens with primitives.json values...');
  const processedLightTokens = processTokens(lightTokens, mode1Tokens);
  console.log('🔄 Processing Dark.json tokens with primitives.json values...');
  const processedDarkTokens = processTokens(darkTokens, mode1Tokens);
  
  // Create merged token structure
  const mergedTokens = {
    colors: {
      // Primary colors (resolved from {blue.400}, {blue.800}, etc.)
      primary: {
        main: processedLightTokens.primary?.main?.value || '#1976d2',
        light: processedLightTokens.primary?.light?.value || '#42a5f5',
        dark: processedLightTokens.primary?.dark?.value || '#1565c0',
        contrastText: processedLightTokens.primary?.contrastText?.value || '#ffffff'
      },
      // Secondary colors (resolved from {teal.500}, {teal.700}, etc.)
      secondary: {
        main: processedLightTokens.secondary?.main?.value || '#dc004e',
        light: processedLightTokens.secondary?.light?.value || '#ff5983',
        dark: processedLightTokens.secondary?.dark?.value || '#9a0036',
        contrastText: processedLightTokens.secondary?.contrastText?.value || '#ffffff'
      },
      // Semantic colors (resolved from actual color references)
      success: {
        main: processedLightTokens.success?.main?.value || '#2e7d32',
        light: processedLightTokens.success?.light?.value || '#4caf50',
        dark: processedLightTokens.success?.dark?.value || '#1b5e20',
        contrastText: processedLightTokens.success?.contrastText?.value || '#ffffff'
      },
      error: {
        main: processedLightTokens.error?.main?.value || '#d32f2f',
        light: processedLightTokens.error?.light?.value || '#ef5350',
        dark: processedLightTokens.error?.dark?.value || '#c62828',
        contrastText: processedLightTokens.error?.contrastText?.value || '#ffffff'
      },
      warning: {
        main: processedLightTokens.warning?.main?.value || '#ed6c02',
        light: processedLightTokens.warning?.light?.value || '#ff9800',
        dark: processedLightTokens.warning?.dark?.value || '#e65100',
        contrastText: processedLightTokens.warning?.contrastText?.value || '#ffffff'
      },
      info: {
        main: processedLightTokens.info?.main?.value || '#0288d1',
        light: processedLightTokens.info?.light?.value || '#03a9f4',
        dark: processedLightTokens.info?.dark?.value || '#01579b',
        contrastText: processedLightTokens.info?.contrastText?.value || '#ffffff'
      },
      // Text colors
      text: {
        primary: processedLightTokens.text?.primary?.value || '#000000de',
        secondary: processedLightTokens.text?.secondary?.value || '#00000099',
        disabled: processedLightTokens.text?.disabled?.value || '#00000061'
      },
      // Background colors
      background: {
        default: processedLightTokens.background?.default?.value || '#ffffff',
        paper: processedLightTokens.background?.['paper-elevation-0']?.value || '#ffffff'
      },
      // Action colors
      action: {
        active: processedLightTokens.action?.active?.value || '#0000008f',
        hover: processedLightTokens.action?.hover?.value || '#0000000a',
        selected: processedLightTokens.action?.selected?.value || '#00000014',
        disabled: processedLightTokens.action?.disabled?.value || '#00000061',
        focus: processedLightTokens.action?.focus?.value || '#0000001f',
        disabledBackground: processedLightTokens.action?.disabledBackground?.value || '#0000001f'
      },
      divider: processedLightTokens.divider?.value || '#0000001f'
    },
    // Use Figma-extracted typography
    typography: figmaTokens.typography || {},
    // Use Figma-extracted shadows
    shadows: figmaTokens.shadows || {},
    // Use Figma-extracted border radius
    borderRadius: figmaTokens.borderRadius || {},
    // Add spacing tokens
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32
    },
    modes: {
      light: {
        colors: {
          primary: {
            main: processedLightTokens.primary?.main?.value || '#1976d2',
            light: processedLightTokens.primary?.light?.value || '#42a5f5',
            dark: processedLightTokens.primary?.dark?.value || '#1565c0',
            contrastText: processedLightTokens.primary?.contrastText?.value || '#ffffff'
          },
          secondary: {
            main: processedLightTokens.secondary?.main?.value || '#dc004e',
            light: processedLightTokens.secondary?.light?.value || '#ff5983',
            dark: processedLightTokens.secondary?.dark?.value || '#9a0036',
            contrastText: processedLightTokens.secondary?.contrastText?.value || '#ffffff'
          },
          success: {
            main: processedLightTokens.success?.main?.value || '#2e7d32',
            light: processedLightTokens.success?.light?.value || '#4caf50',
            dark: processedLightTokens.success?.dark?.value || '#1b5e20',
            contrastText: processedLightTokens.success?.contrastText?.value || '#ffffff'
          },
          error: {
            main: processedLightTokens.error?.main?.value || '#d32f2f',
            light: processedLightTokens.error?.light?.value || '#ef5350',
            dark: processedLightTokens.error?.dark?.value || '#c62828',
            contrastText: processedLightTokens.error?.contrastText?.value || '#ffffff'
          },
          warning: {
            main: processedLightTokens.warning?.main?.value || '#ed6c02',
            light: processedLightTokens.warning?.light?.value || '#ff9800',
            dark: processedLightTokens.warning?.dark?.value || '#e65100',
            contrastText: processedLightTokens.warning?.contrastText?.value || '#ffffff'
          },
          info: {
            main: processedLightTokens.info?.main?.value || '#0288d1',
            light: processedLightTokens.info?.light?.value || '#03a9f4',
            dark: processedLightTokens.info?.dark?.value || '#01579b',
            contrastText: processedLightTokens.info?.contrastText?.value || '#ffffff'
          }
        },
        text: {
          primary: processedLightTokens.text?.primary?.value || '#000000de',
          secondary: processedLightTokens.text?.secondary?.value || '#00000099',
          disabled: processedLightTokens.text?.disabled?.value || '#00000061'
        },
        background: {
          default: processedLightTokens.background?.default?.value || '#ffffff',
          paper: processedLightTokens.background?.['paper-elevation-0']?.value || '#ffffff'
        },
        action: {
          active: processedLightTokens.action?.active?.value || '#0000008f',
          hover: processedLightTokens.action?.hover?.value || '#0000000a',
          selected: processedLightTokens.action?.selected?.value || '#00000014',
          disabled: processedLightTokens.action?.disabled?.value || '#00000061',
          focus: processedLightTokens.action?.focus?.value || '#0000001f',
          disabledBackground: processedLightTokens.action?.disabledBackground?.value || '#0000001f'
        },
        divider: processedLightTokens.divider?.value || '#0000001f'
      },
      dark: {
        colors: {
          primary: {
            main: processedDarkTokens.primary?.main?.value || '#90caf9',
            light: processedDarkTokens.primary?.light?.value || '#e3f2fd',
            dark: processedDarkTokens.primary?.dark?.value || '#1565c0',
            contrastText: processedDarkTokens.primary?.contrastText?.value || '#000000de'
          },
          secondary: {
            main: processedDarkTokens.secondary?.main?.value || '#d5fbff',
            light: processedDarkTokens.secondary?.light?.value || '#f0feff',
            dark: processedDarkTokens.secondary?.dark?.value || '#76efff',
            contrastText: processedDarkTokens.secondary?.contrastText?.value || '#000000de'
          },
          success: {
            main: processedDarkTokens.success?.main?.value || '#66bb6a',
            light: processedDarkTokens.success?.light?.value || '#c8e6c9',
            dark: processedDarkTokens.success?.dark?.value || '#388e3c',
            contrastText: processedDarkTokens.success?.contrastText?.value || '#000000de'
          },
          error: {
            main: processedDarkTokens.error?.main?.value || '#f44336',
            light: processedDarkTokens.error?.light?.value || '#ffcdd2',
            dark: processedDarkTokens.error?.dark?.value || '#d32f2f',
            contrastText: processedDarkTokens.error?.contrastText?.value || '#ffffff'
          },
          warning: {
            main: processedDarkTokens.warning?.main?.value || '#ffa726',
            light: processedDarkTokens.warning?.light?.value || '#ffe0b2',
            dark: processedDarkTokens.warning?.dark?.value || '#f57c00',
            contrastText: processedDarkTokens.warning?.contrastText?.value || '#000000de'
          },
          info: {
            main: processedDarkTokens.info?.main?.value || '#29b6f6',
            light: processedDarkTokens.info?.light?.value || '#b3e5fc',
            dark: processedDarkTokens.info?.dark?.value || '#0288d1',
            contrastText: processedDarkTokens.info?.contrastText?.value || '#000000de'
          }
        },
        text: {
          primary: processedDarkTokens.text?.primary?.value || '#ffffffde',
          secondary: processedDarkTokens.text?.secondary?.value || '#ffffffb3',
          disabled: processedDarkTokens.text?.disabled?.value || '#ffffff61'
        },
        background: {
          default: processedDarkTokens.background?.default?.value || '#121212',
          paper: processedDarkTokens.background?.['paper-elevation-4']?.value || '#1e1e1e'
        },
        action: {
          active: processedDarkTokens.action?.active?.value || '#ffffff8f',
          hover: processedDarkTokens.action?.hover?.value || '#ffffff14',
          selected: processedDarkTokens.action?.selected?.value || '#ffffff29',
          disabled: processedDarkTokens.action?.disabled?.value || '#ffffff61',
          focus: processedDarkTokens.action?.focus?.value || '#ffffff1f',
          disabledBackground: processedDarkTokens.action?.disabledBackground?.value || '#ffffff1f'
        },
        divider: processedDarkTokens.divider?.value || '#ffffff1f'
      }
    },
    metadata: {
      mergedAt: new Date().toISOString(),
      sources: ['primitives.json', 'Light.json', 'Dark.json', 'figmaTokens.json'],
      version: '1.0.0'
    }
  };
  
  // Save merged tokens
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mergedTokens, null, 2));
  console.log(`✅ Merged tokens saved to: ${OUTPUT_FILE}`);
  
  // Create a simplified theme file for MUI
  const themeFile = path.join(TOKENS_DIR, 'muiTheme.ts');
  const themeContent = generateMUITheme(mergedTokens);
  fs.writeFileSync(themeFile, themeContent);
  console.log(`✅ MUI theme file saved to: ${themeFile}`);
  
  console.log('\n🎉 Token merging completed successfully!');
  console.log('\n📁 Files created:');
  console.log(`   📄 ${OUTPUT_FILE}`);
  console.log(`   📄 ${themeFile}`);
  console.log('\n💡 Next steps:');
  console.log('   1. The merged tokens are ready to use');
  console.log('   2. Your Figma token sync will use these tokens');
  console.log('   3. Components will automatically use the new color scheme');
console.log('\n🎨 Color values resolved from primitives.json:');
  console.log(`   Primary: ${mergedTokens.colors.primary.main}`);
  console.log(`   Secondary: ${mergedTokens.colors.secondary.main}`);
  console.log(`   Success: ${mergedTokens.colors.success.main}`);
  console.log(`   Error: ${mergedTokens.colors.error.main}`);
  console.log(`   Warning: ${mergedTokens.colors.warning.main}`);
  console.log(`   Info: ${mergedTokens.colors.info.main}`);
}

/**
 * Generate MUI theme from merged tokens
 */
function generateMUITheme(tokens) {
  return `// Auto-generated MUI theme from merged design tokens
import { createTheme, ThemeOptions } from '@mui/material/styles';

export const muiThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '${tokens.colors.primary.main}',
      light: '${tokens.colors.primary.light}',
      dark: '${tokens.colors.primary.dark}',
      contrastText: '${tokens.colors.primary.contrastText}',
    },
    secondary: {
      main: '${tokens.colors.secondary.main}',
      light: '${tokens.colors.secondary.light}',
      dark: '${tokens.colors.secondary.dark}',
      contrastText: '${tokens.colors.secondary.contrastText}',
    },
    success: {
      main: '${tokens.colors.success.main}',
      light: '${tokens.colors.success.light}',
      dark: '${tokens.colors.success.dark}',
      contrastText: '${tokens.colors.success.contrastText}',
    },
    error: {
      main: '${tokens.colors.error.main}',
      light: '${tokens.colors.error.light}',
      dark: '${tokens.colors.error.dark}',
      contrastText: '${tokens.colors.error.contrastText}',
    },
    warning: {
      main: '${tokens.colors.warning.main}',
      light: '${tokens.colors.warning.light}',
      dark: '${tokens.colors.warning.dark}',
      contrastText: '${tokens.colors.warning.contrastText}',
    },
    info: {
      main: '${tokens.colors.info.main}',
      light: '${tokens.colors.info.light}',
      dark: '${tokens.colors.info.dark}',
      contrastText: '${tokens.colors.info.contrastText}',
    },
    text: {
      primary: '${tokens.colors.text.primary}',
      secondary: '${tokens.colors.text.secondary}',
      disabled: '${tokens.colors.text.disabled}',
    },
    background: {
      default: '${tokens.colors.background.default}',
      paper: '${tokens.colors.background.paper}',
    },
    action: {
      active: '${tokens.colors.action.active}',
      hover: '${tokens.colors.action.hover}',
      selected: '${tokens.colors.action.selected}',
      disabled: '${tokens.colors.action.disabled}',
      focus: '${tokens.colors.action.focus}',
      disabledBackground: '${tokens.colors.action.disabledBackground}',
    },
  },
  typography: {
    fontFamily: '${Object.values(tokens.typography).map(t => t.value).join(', ')}',
  },
  shape: {
    borderRadius: ${tokens.borderRadius.default?.value || 8},
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: ${tokens.borderRadius.default?.value || 16},
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: ${tokens.borderRadius.default?.value || 12},
          boxShadow: '${tokens.shadows['shadow-1']?.value || '0 2px 8px rgba(0,0,0,0.1)'}',
        },
      },
    },
  },
};

export const muiTheme = createTheme(muiThemeOptions);
export default muiTheme;
`;
}

// Run the merger
mergeTokens();
