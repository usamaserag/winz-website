/**
 * Optimizes logo PNG assets to WebP for smaller transfer sizes.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const imagesDir = join(root, 'src/assets/images');
const publicDir = join(root, 'public');

const targets = [
  {
    input: 'WhatsApp_Image_2026-05-13_at_12.54.03_AM-removebg-preview.png',
    webp: 'logo-colored.webp',
    maxWidth: 224,
  },
  {
    input: 'Icon-removebg-preview.png',
    webp: 'logo-white.webp',
    maxWidth: 224,
  },
];

await mkdir(publicDir, { recursive: true });

for (const { input, webp, maxWidth } of targets) {
  const inputPath = join(imagesDir, input);
  const webpPath = join(imagesDir, webp);

  await sharp(inputPath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(webpPath);

  console.log(`Created ${webp}`);
}

await copyFile(
  join(imagesDir, 'Icon-removebg-preview.png'),
  join(publicDir, 'favicon.png'),
);
console.log('Copied favicon.png to public/');
