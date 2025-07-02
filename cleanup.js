const fs = require('fs');

// Read the file
const filePath = 'src/pages/HiraganaKatakana.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Remove problematic lines
content = content.replace(/.*onMouseEnter.*setCurrentScript.*\n/g, '');
content = content.replace(/.*onMouseLeave.*setCurrentScript.*\n/g, '');
content = content.replace(/.*onTouchStart.*handleCharacterClick.*\n/g, '');
content = content.replace(/.*onTouchEnd.*setCurrentScript.*\n/g, '');

// Write the cleaned content back
fs.writeFileSync(filePath, content);

console.log('File cleaned successfully'); 