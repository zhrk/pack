const fs = require('fs');
const path = require('path');

const collator = new Intl.Collator();

const ICONS_DIR = path.resolve(process.cwd(), 'src/static/icons');
const OUTPUT_FILE = path.join(ICONS_DIR, 'index.tsx');

const toPascalCase = (name) =>
  name
    .split('-')
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');

const toCamelCase = (name) => {
  const pascal = toPascalCase(name);
  return pascal[0].toLowerCase() + pascal.slice(1);
};

const svgFiles = fs
  .readdirSync(ICONS_DIR)
  .filter((file) => file.endsWith('.svg'))
  .sort((a, b) => collator.compare(a, b));

const imports = svgFiles
  .map((file) => {
    const base = file.replace('.svg', '');
    return `import ${toPascalCase(base)}Icon from './${file}';`;
  })
  .join('\n');

const iconsObject = svgFiles
  .map((file) => {
    const base = file.replace('.svg', '');
    return `  ${toCamelCase(base)}: <${toPascalCase(base)}Icon />,`;
  })
  .join('\n');

const content = `${imports}

export const icons = {
${iconsObject}
};

export default icons;
`;

fs.writeFileSync(OUTPUT_FILE, content);
