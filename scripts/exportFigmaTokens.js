#!/usr/bin/env node

/**
 * Figma Design Token Export Script
 * 
 * This script exports design tokens from Figma and saves them in a format
 * that can be used by the Figma token sync system.
 * 
 * Usage:
 * 1. Set your FIGMA_ACCESS_TOKEN environment variable
 * 2. Run: node scripts/exportFigmaTokens.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const FIGMA_FILE_KEY = 'KLNk6eJCBd573J4Qi5oHVs';
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'tokens');
const TOKEN_TYPES = ['colors', 'spacing', 'typography', 'shadows', 'borderRadius'];

// Check for access token
const accessToken = process.env.FIGMA_ACCESS_TOKEN;
if (!accessToken) {
  console.error('❌ FIGMA_ACCESS_TOKEN environment variable not set');
  console.log('💡 Please set your Figma access token:');
  console.log('   export FIGMA_ACCESS_TOKEN="your_token_here"');
  process.exit(1);
}

/**
 * Fetch file data from Figma API
 */
async function fetchFigmaFile() {
  try {
    console.log('🔄 Fetching Figma file data...');
    
    const response = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`,
      {
        headers: {
          'X-Figma-Token': accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Figma file data fetched successfully');
    return data;
  } catch (error) {
    console.error('❌ Error fetching Figma file:', error.message);
    process.exit(1);
  }
}

/**
 * Extract design tokens from Figma file data
 */
function extractDesignTokens(figmaData) {
  console.log('🔄 Extracting design tokens from Figma file...');
  
  const tokens = {
    colors: {},
    spacing: {},
    typography: {},
    shadows: {},
    borderRadius: {},
    metadata: {
      exportedAt: new Date().toISOString(),
      figmaFile: FIGMA_FILE_KEY,
      version: '1.0.0',
      fileName: figmaData.name || 'Unknown'
    }
  };

  // Extract colors from styles
  if (figmaData.styles) {
    Object.entries(figmaData.styles).forEach(([key, style]) => {
      if (style.styleType === 'FILL') {
        const colorName = key.replace(/^.*\//, ''); // Remove prefix
        // Only add if it's a valid color value
        if (style.description && style.description.startsWith('#')) {
          tokens.colors[colorName] = {
            value: style.description,
            type: 'color',
            description: `Color from ${key}`,
            figmaId: key
          };
        }
      }
    });
  }

  // Extract from document structure (looking for common design token patterns)
  if (figmaData.document) {
    extractTokensFromNode(figmaData.document, tokens);
  }

  console.log('✅ Design tokens extracted successfully');
  return tokens;
}

/**
 * Recursively extract tokens from Figma nodes
 */
function extractTokensFromNode(node, tokens) {
  if (!node) return;

  // Look for text styles (typography)
  if (node.type === 'TEXT' && node.style) {
    const fontName = node.style.fontFamily || 'default';
    if (!tokens.typography[fontName]) {
      tokens.typography[fontName] = {
        value: node.style.fontFamily || 'Arial',
        type: 'fontFamily',
        description: `Font family from ${node.name}`,
        figmaId: node.id
      };
    }
  }

  // Look for effects (shadows)
  if (node.effects && node.effects.length > 0) {
    node.effects.forEach((effect, index) => {
      if (effect.type === 'DROP_SHADOW') {
        const shadowName = `shadow-${index}`;
        tokens.shadows[shadowName] = {
          value: `${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px rgba(0,0,0,${effect.opacity || 0.5})`,
          type: 'shadow',
          description: `Shadow from ${node.name}`,
          figmaId: node.id
        };
      }
    });
  }

  // Look for corner radius (border radius)
  if (node.cornerRadius !== undefined) {
    const radiusName = node.cornerRadius > 0 ? 'default' : 'none';
    if (!tokens.borderRadius[radiusName]) {
      tokens.borderRadius[radiusName] = {
        value: node.cornerRadius,
        type: 'borderRadius',
        description: `Border radius from ${node.name}`,
        figmaId: node.id
      };
    }
  }

  // Recursively process children
  if (node.children) {
    node.children.forEach(child => extractTokensFromNode(child, tokens));
  }
}

/**
 * Transform Figma tokens to our format
 */
function transformTokens(figmaData) {
  console.log('🔄 Transforming tokens...');
  
  const extractedTokens = extractDesignTokens(figmaData);
  
  // If we didn't find many tokens, use fallback tokens
  const hasTokens = Object.values(extractedTokens).some(type => 
    Object.keys(type).length > 0
  );

  if (!hasTokens) {
    console.log('⚠️ No design tokens found, using fallback tokens');
    return getFallbackTokens();
  }

  return extractedTokens;
}

/**
 * Save tokens to files
 */
function saveTokens(tokens) {
  console.log('💾 Saving tokens...');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Save main tokens file
  const mainTokensPath = path.join(OUTPUT_DIR, 'figmaTokens.json');
  fs.writeFileSync(mainTokensPath, JSON.stringify(tokens, null, 2));
  console.log(`✅ Main tokens saved to: ${mainTokensPath}`);

  // Save individual token type files
  TOKEN_TYPES.forEach(type => {
    if (tokens[type] && Object.keys(tokens[type]).length > 0) {
      const typeTokensPath = path.join(OUTPUT_DIR, `${type}.json`);
      fs.writeFileSync(typeTokensPath, JSON.stringify(tokens[type], null, 2));
      console.log(`✅ ${type} tokens saved to: ${typeTokensPath}`);
    }
  });

  // Save TypeScript types
  const typesPath = path.join(OUTPUT_DIR, 'types.ts');
  const typesContent = generateTypeScriptTypes(tokens);
  fs.writeFileSync(typesPath, typesContent);
  console.log(`✅ TypeScript types saved to: ${typesPath}`);

  // Save CSS variables
  const cssPath = path.join(OUTPUT_DIR, 'variables.css');
  const cssContent = generateCSSVariables(tokens);
  fs.writeFileSync(cssPath, cssContent);
  console.log(`✅ CSS variables saved to: ${cssPath}`);
}

/**
 * Generate TypeScript types for tokens
 */
function generateTypeScriptTypes(tokens) {
  let types = '// Auto-generated from Figma tokens\n\n';
  
  types += 'export interface FigmaTokens {\n';
  TOKEN_TYPES.forEach(type => {
    if (tokens[type] && Object.keys(tokens[type]).length > 0) {
      types += `  ${type}: {\n`;
      Object.entries(tokens[type]).forEach(([key, token]) => {
        types += `    ${key}: {\n`;
        types += `      value: ${typeof token.value === 'string' ? 'string' : 'number'};\n`;
        types += `      type: string;\n`;
        types += `      description: string;\n`;
        types += `      figmaId: string;\n`;
        types += `    };\n`;
      });
      types += `  };\n`;
    }
  });
  types += '}\n\n';
  
  types += 'export default tokens;\n';
  return types;
}

/**
 * Generate CSS variables from tokens
 */
function generateCSSVariables(tokens) {
  let css = '/* Auto-generated from Figma tokens */\n\n';
  css += ':root {\n';
  
  // Colors
  if (tokens.colors && Object.keys(tokens.colors).length > 0) {
    css += '  /* Colors */\n';
    Object.entries(tokens.colors).forEach(([key, token]) => {
      // Only add valid color values
      if (typeof token.value === 'string' && token.value.startsWith('#')) {
        css += `  --figma-color-${key}: ${token.value};\n`;
      }
    });
    css += '\n';
  }

  // Spacing
  if (tokens.spacing && Object.keys(tokens.spacing).length > 0) {
    css += '  /* Spacing */\n';
    Object.entries(tokens.spacing).forEach(([key, token]) => {
      css += `  --figma-spacing-${key}: ${token.value}px;\n`;
    });
    css += '\n';
  }

  // Typography
  if (tokens.typography && Object.keys(tokens.typography).length > 0) {
    css += '  /* Typography */\n';
    Object.entries(tokens.typography).forEach(([key, token]) => {
      if (key === 'fontFamily') {
        css += `  --figma-typography-${key}: ${token.value};\n`;
      } else if (key === 'fontWeight') {
        css += `  --figma-typography-${key}: ${token.value};\n`;
      } else {
        css += `  --figma-typography-${key}: ${token.value};\n`;
      }
    });
    css += '\n';
  }

  // Shadows
  if (tokens.shadows && Object.keys(tokens.shadows).length > 0) {
    css += '  /* Shadows */\n';
    Object.entries(tokens.shadows).forEach(([key, token]) => {
      css += `  --figma-shadow-${key}: ${token.value};\n`;
    });
    css += '\n';
  }

  // Border Radius
  if (tokens.borderRadius && Object.keys(tokens.borderRadius).length > 0) {
    css += '  /* Border Radius */\n';
    Object.entries(tokens.borderRadius).forEach(([key, token]) => {
      css += `  --figma-border-radius-${key}: ${token.value}px;\n`;
    });
    css += '\n';
  }

  css += '}\n';
  return css;
}

/**
 * Fallback tokens when no Figma tokens are found
 */
function getFallbackTokens() {
  return {
    colors: {
      primary: { value: '#1976d2', type: 'color', description: 'Primary color', figmaId: 'fallback' },
      secondary: { value: '#dc004e', type: 'color', description: 'Secondary color', figmaId: 'fallback' },
      success: { value: '#2e7d32', type: 'color', description: 'Success color', figmaId: 'fallback' },
      error: { value: '#d32f2f', type: 'color', description: 'Error color', figmaId: 'fallback' },
      warning: { value: '#ed6c02', type: 'color', description: 'Warning color', figmaId: 'fallback' },
      info: { value: '#0288d1', type: 'color', description: 'Info color', figmaId: 'fallback' },
    },
    spacing: {
      xs: { value: 4, type: 'spacing', description: 'Extra small spacing', figmaId: 'fallback' },
      sm: { value: 8, type: 'spacing', description: 'Small spacing', figmaId: 'fallback' },
      md: { value: 16, type: 'spacing', description: 'Medium spacing', figmaId: 'fallback' },
      lg: { value: 24, type: 'spacing', description: 'Large spacing', figmaId: 'fallback' },
      xl: { value: 32, type: 'spacing', description: 'Extra large spacing', figmaId: 'fallback' },
    },
    typography: {
      fontFamily: { value: 'Roboto, Arial, sans-serif', type: 'fontFamily', description: 'Default font family', figmaId: 'fallback' },
      fontSize: { value: '1rem', type: 'fontSize', description: 'Default font size', figmaId: 'fallback' },
      fontWeight: { value: 400, type: 'fontWeight', description: 'Default font weight', figmaId: 'fallback' },
      lineHeight: { value: 1.5, type: 'lineHeight', description: 'Default line height', figmaId: 'fallback' },
    },
    shadows: {
      0: { value: 'none', type: 'shadow', description: 'No shadow', figmaId: 'fallback' },
      1: { value: '0 1px 3px rgba(0,0,0,0.12)', type: 'shadow', description: 'Light shadow', figmaId: 'fallback' },
      2: { value: '0 3px 6px rgba(0,0,0,0.16)', type: 'shadow', description: 'Medium shadow', figmaId: 'fallback' },
      3: { value: '0 6px 12px rgba(0,0,0,0.20)', type: 'shadow', description: 'Heavy shadow', figmaId: 'fallback' },
      4: { value: '0 8px 16px rgba(0,0,0,0.24)', type: 'shadow', description: 'Extra heavy shadow', figmaId: 'fallback' },
      8: { value: '0 16px 32px rgba(0,0,0,0.28)', type: 'shadow', description: 'Large shadow', figmaId: 'fallback' },
      16: { value: '0 32px 64px rgba(0,0,0,0.32)', type: 'shadow', description: 'Extra large shadow', figmaId: 'fallback' },
      24: { value: '0 48px 96px rgba(0,0,0,0.36)', type: 'shadow', description: 'Maximum shadow', figmaId: 'fallback' },
    },
    borderRadius: {
      xs: { value: 4, type: 'borderRadius', description: 'Extra small border radius', figmaId: 'fallback' },
      sm: { value: 8, type: 'borderRadius', description: 'Small border radius', figmaId: 'fallback' },
      md: { value: 12, type: 'borderRadius', description: 'Medium border radius', figmaId: 'fallback' },
      lg: { value: 16, type: 'borderRadius', description: 'Large border radius', figmaId: 'fallback' },
      xl: { value: 24, type: 'borderRadius', description: 'Extra large border radius', figmaId: 'fallback' },
    },
    metadata: {
      exportedAt: new Date().toISOString(),
      figmaFile: FIGMA_FILE_KEY,
      version: '1.0.0',
      fileName: 'Fallback Tokens'
    }
  };
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('🚀 Starting Figma token export...\n');
    
    // Fetch Figma file data
    const figmaData = await fetchFigmaFile();
    
    // Transform tokens to our format
    const transformedTokens = transformTokens(figmaData);
    
    // Save tokens to files
    saveTokens(transformedTokens);
    
    console.log('\n🎉 Token export completed successfully!');
    console.log('\n📁 Files created:');
    console.log(`   📄 ${path.join(OUTPUT_DIR, 'figmaTokens.json')}`);
    console.log(`   📄 ${path.join(OUTPUT_DIR, 'types.ts')}`);
    console.log(`   📄 ${path.join(OUTPUT_DIR, 'variables.css')}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Review the exported tokens');
    console.log('   2. Update your theme configuration if needed');
    console.log('   3. The automatic sync will use these tokens');
    
  } catch (error) {
    console.error('❌ Export failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
