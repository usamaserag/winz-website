/**
 * Optimizes logo PNG assets to WebP for smaller transfer sizes.
 * Skips WebP generation when `sharp` is unavailable (e.g. production CI without devDependencies).
 * Pre-generated .webp files in src/assets/images are used in that case.
 */
import { access, copyFile, mkdir } from 'node:fs/promises';
import { constants } from 'node:fs';
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

async function fileExists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn(
    'sharp is not installed — skipping WebP regeneration (using committed .webp assets).',
  );
}

await mkdir(publicDir, { recursive: true });

for (const { input, webp, maxWidth } of targets) {
  const inputPath = join(imagesDir, input);
  const webpPath = join(imagesDir, webp);

  if (sharp) {
    await sharp(inputPath)
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath);
    console.log(`Created ${webp}`);
  } else if (await fileExists(webpPath)) {
    console.log(`Using existing ${webp}`);
  } else {
    console.error(
      `Missing ${webp} and sharp is unavailable to generate it. Run "npm install" locally and rebuild, or commit the WebP assets.`,
    );
    process.exit(1);
  }
}

await copyFile(
  join(imagesDir, 'Icon-removebg-preview.png'),
  join(publicDir, 'favicon.png'),
);
console.log('Copied favicon.png to public/');
