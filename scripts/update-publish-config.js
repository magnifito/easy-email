const fs = require('fs');
const path = require('path');

const packages = [
  'packages/easy-email-core/package.json',
  'packages/easy-email-editor/package.json',
  'packages/easy-email-extensions/package.json',
  'packages/easy-email-localization/package.json'
];

packages.forEach(pkgPath => {
  const absolutePath = path.resolve(pkgPath);
  if (fs.existsSync(absolutePath)) {
    const pkg = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
    pkg.publishConfig = {
      access: 'public'
    };
    fs.writeFileSync(absolutePath, JSON.stringify(pkg, null, 2));
    console.log(`Updated ${pkgPath}`);
  }
});
