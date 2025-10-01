# 🎨 Figma Token Synchronization

This project now includes automatic synchronization between Figma design tokens and your MUI theme! This means your components will automatically update when design tokens change in Figma.

## 🚀 Quick Start

### 1. Set Up Figma Access Token

First, you need to get your Figma access token:

1. Go to [Figma Settings](https://www.figma.com/settings)
2. Navigate to "Account" → "Personal access tokens"
3. Create a new token
4. Copy the token and set it as an environment variable:

```bash
export FIGMA_ACCESS_TOKEN="your_token_here"
```

### 2. Export Initial Tokens

Run the token export script to get your current Figma tokens:

```bash
node scripts/exportFigmaTokens.js
```

This will create:
- `src/tokens/figmaTokens.json` - All tokens in one file
- `src/tokens/types.ts` - TypeScript types for tokens
- `src/tokens/variables.css` - CSS variables for tokens
- Individual token type files (colors.json, spacing.json, etc.)

### 3. Automatic Sync

The system automatically syncs every 5 seconds and updates your theme in real-time! 🎉

## 🔧 How It Works

### Token Sync Flow

```
Figma Design Tokens → Figma API → Token Sync Service → MUI Theme Update → Component Re-render
```

### Files Structure

```
src/
├── utils/
│   └── figmaTokenSync.ts      # Main sync service
├── hooks/
│   └── useFigmaTheme.ts       # React hook for theme updates
├── tokens/                     # Exported Figma tokens
│   ├── figmaTokens.json
│   ├── types.ts
│   └── variables.css
└── main.tsx                   # Updated to use Figma theme sync
```

## 🎯 Features

### ✅ Automatic Synchronization
- **Real-time updates** every 5 seconds
- **Smart change detection** - only updates when tokens change
- **Fallback tokens** when Figma API is unavailable

### ✅ MUI Theme Integration
- **Seamless integration** with existing MUI theme
- **Automatic component updates** when theme changes
- **Preserves custom component overrides**

### ✅ Token Type Support
- **Colors** (primary, secondary, success, error, warning, info)
- **Spacing** (xs, sm, md, lg, xl)
- **Typography** (fontFamily, fontSize, fontWeight, lineHeight)
- **Shadows** (0-24 elevation levels)
- **Border Radius** (xs, sm, md, lg, xl)

## 🛠️ Configuration

### Figma Config (`figma.config.json`)

```json
{
  "figma": {
    "fileKey": "KLNk6eJCBd573J4Qi5oHVs",
    "nodeId": "15702-108812",
    "tokens": {
      "colors": {
        "primary": "primary/main",
        "secondary": "secondary/main"
      },
      "spacing": {
        "xs": "spacing/xs",
        "sm": "spacing/sm"
      }
    },
    "sync": {
      "enabled": true,
      "interval": 5000,
      "autoUpdate": true
    }
  }
}
```

### Environment Variables

```bash
# Required
FIGMA_ACCESS_TOKEN=your_figma_token

# Optional
FIGMA_SYNC_INTERVAL=5000        # Sync interval in milliseconds
FIGMA_AUTO_UPDATE=true          # Enable/disable auto updates
```

## 📱 Usage Examples

### Basic Usage

The system works automatically once set up! Your components will automatically use the latest Figma tokens.

### Manual Token Export

```bash
# Export current tokens
node scripts/exportFigmaTokens.js

# Export with custom interval
FIGMA_SYNC_INTERVAL=10000 node scripts/exportFigmaTokens.js
```

### Custom Token Mapping

You can customize how Figma tokens map to your theme by editing `src/utils/figmaTokenSync.ts`:

```typescript
private createThemeFromTokens(tokens: FigmaTokens): ThemeOptions {
  return {
    palette: {
      primary: {
        main: this.parseColor(tokens.colors.primary?.value),
        // Add custom mapping here
      }
    }
  };
}
```

## 🔍 Troubleshooting

### Common Issues

#### 1. "FIGMA_ACCESS_TOKEN not set"
```bash
export FIGMA_ACCESS_TOKEN="your_token_here"
```

#### 2. "Figma API error: 403"
- Check if your token has the correct permissions
- Ensure the file is accessible with your account

#### 3. "Tokens not updating"
- Check browser console for sync messages
- Verify the Figma file key is correct
- Check network tab for API calls

### Debug Mode

Enable debug logging by adding this to your browser console:

```javascript
localStorage.setItem('figma-debug', 'true');
```

### Manual Sync Test

Test the sync manually:

```javascript
// In browser console
window.figmaTokenSync.syncTokens();
```

## 🚀 Advanced Features

### Custom Token Parsers

Add custom token parsing logic:

```typescript
private parseCustomToken(value: any, type: string): any {
  switch (type) {
    case 'customType':
      return this.transformCustomValue(value);
    default:
      return value;
  }
}
```

### Webhook Integration

Set up webhooks for instant updates:

```typescript
// In figmaTokenSync.ts
private setupWebhook() {
  // Listen for Figma webhook events
  // Update tokens immediately when changes occur
}
```

### Token Validation

Add validation for token values:

```typescript
private validateToken(token: FigmaToken): boolean {
  // Validate token format and values
  return token.value !== undefined && token.type !== undefined;
}
```

## 📚 API Reference

### FigmaTokenSync Class

```typescript
class FigmaTokenSync {
  startSync(intervalMs?: number): void;    // Start automatic sync
  stopSync(): void;                        // Stop automatic sync
  syncTokens(): Promise<void>;             // Manual sync
}
```

### useFigmaTheme Hook

```typescript
const useFigmaTheme = (props: {
  children: React.ReactNode;
  fallbackTheme?: Theme;
}): JSX.Element;
```

## 🤝 Contributing

To add new token types or improve the sync system:

1. **Add new token type** to `TOKEN_TYPES` array
2. **Update interfaces** in `figmaTokenSync.ts`
3. **Add parsing logic** for new token types
4. **Update theme creation** to use new tokens
5. **Test with real Figma tokens**

## 📄 License

This token synchronization system is part of your MUI component library project.

---

**🎉 You now have automatic Figma token synchronization!** Your design system will stay in sync with Figma automatically, and your components will always use the latest design tokens.
