const fs = require('fs');
const { execFileSync } = require('child_process');
const path = require('path');

const imgDir = path.join(process.cwd(), 'src/assets/images');
const publicDir = path.join(process.cwd(), 'public/images');
fs.mkdirSync(publicDir, { recursive: true });

const files = fs.readdirSync(imgDir).filter(f => (f.endsWith('.jpg') || f.endsWith('.png')) && !f.includes('.webp'));

files.forEach(file => {
  const baseName = file.replace(/_\d+\.jpg$/, '').replace(/\.jpg$/, '');
  const srcPath = path.join(imgDir, file);
  
  const isHero = baseName.includes('hero') || baseName.includes('catering') || baseName.includes('dining') || baseName.includes('overhead');
  const size = isHero ? '1920x1920>' : '1000x1000>';
  
  const webpDestInAssets = path.join(imgDir, `${baseName}.webp`);
  const webpDestInPublic = path.join(publicDir, `${baseName}.webp`);
  const jpgDestInAssets = path.join(imgDir, `${baseName}.jpg`);
  const jpgDestInPublic = path.join(publicDir, `${baseName}.jpg`);
  
  console.log(`Optimizing ${file} -> ${baseName}.webp`);
  try {
    execFileSync('convert', [
      srcPath,
      '-resize', size,
      '-quality', '85',
      '-define', 'webp:lossless=false',
      webpDestInAssets
    ]);
    fs.copyFileSync(webpDestInAssets, webpDestInPublic);
    fs.copyFileSync(srcPath, jpgDestInAssets);
    fs.copyFileSync(srcPath, jpgDestInPublic);
  } catch (err) {
    console.error(`Error converting ${file}:`, err.message);
  }
});

console.log('All images optimized successfully!');
