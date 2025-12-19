const fs = require('fs');

const files = {
  'package.json': `محتوای package.json از artifact`,
  // ... بقیه فایل‌ها
};

Object.entries(files).forEach(([name, content]) => {
  fs.writeFileSync(name, content);
  console.log('✅', name);
});

['public/locales', 'src/components/layout', 'src/pages', 'src/hooks', 'src/i18n', 'src/types'].forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
});

console.log('✨ Done!');
