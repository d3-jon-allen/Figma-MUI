import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import App from './App.tsx'
import './index.css'
import { theme } from './utils/theme'

console.log('🚀 main.tsx is executing...');

// Check if root element exists
const rootElement = document.getElementById('root');
console.log('🔍 Root element found:', rootElement);

if (!rootElement) {
  console.error('❌ Root element not found!');
} else {
  console.log('✅ Root element exists, creating React root...');
  
  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log('🎯 React root created:', root);
    
    console.log('🔍 About to render React app with MUI theme...');
    
    root.render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </React.StrictMode>,
    );
    
    console.log('✅ React app render called with MUI theme!');
  } catch (error) {
    console.error('❌ Error creating React root:', error);
  }
}

console.log('🏁 main.tsx execution complete');
