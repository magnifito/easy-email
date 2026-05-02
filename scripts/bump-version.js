const fs = require('fs');
const path = require('path');

const version = '4.17.0';
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
    pkg.version = version;
    
    // Update internal dependencies
    if (pkg.dependencies) {
      Object.keys(pkg.dependencies).forEach(dep => {
        if (dep.startsWith('@puralex/easy-email')) {
          pkg.dependencies[dep] = `^${version}`;
        }
      });
    }
    if (pkg.peerDependencies) {
      Object.keys(pkg.peerDependencies).forEach(dep => {
        if (dep.startsWith('@puralex/easy-email')) {
          pkg.peerDependencies[dep] = `^${version}`;
        }
      });
    }
    
    fs.writeFileSync(absolutePath, JSON.stringify(pkg, null, 2));
    console.log(`Updated ${pkgPath} to ${version}`);
  }
});
