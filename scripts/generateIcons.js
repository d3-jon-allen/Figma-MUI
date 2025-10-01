import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the icons directory
const iconsDir = path.join(__dirname, '../icons');
const outputDir = path.join(__dirname, '../src/components/icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all SVG files
const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

// Generate icon components
svgFiles.forEach(svgFile => {
  const iconName = path.basename(svgFile, '.svg');
  const pascalCaseName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  // Read SVG content
  const svgPath = path.join(iconsDir, svgFile);
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  // Extract path data
  const pathMatch = svgContent.match(/<path[^>]*d="([^"]*)"[^>]*>/);
  if (!pathMatch) return;
  
  const pathData = pathMatch[1];
  
  // Generate React component
  const componentCode = `import React from 'react';

interface ${pascalCaseName}Props {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
}

const ${pascalCaseName}: React.FC<${pascalCaseName}Props> = ({ 
  width = 24, 
  height = 24, 
  color = 'currentColor',
  className = ''
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="${pathData}" 
        fill={color}
      />
    </svg>
  );
};

export default ${pascalCaseName};
`;

  // Write component file
  const outputPath = path.join(outputDir, `${pascalCaseName}.tsx`);
  fs.writeFileSync(outputPath, componentCode);
  
  console.log(`Generated: ${pascalCaseName}.tsx`);
});

// Update index.ts with all generated icons
const indexContent = `// Auto-generated icon exports
${svgFiles.map(svgFile => {
  const iconName = path.basename(svgFile, '.svg');
  const pascalCaseName = iconName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  return `export { default as ${pascalCaseName} } from './${pascalCaseName}';`;
}).join('\n')}
`;

fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
console.log('Updated: index.ts');

console.log(`\nGenerated ${svgFiles.length} icon components!`);
