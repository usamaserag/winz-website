/**
 * Run Lighthouse on major routes (production preview must be running).
 * Usage: npx vite preview --port 4173 & npm run lighthouse
 */
import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.LH_BASE_URL || 'http://localhost:4173';
const OUT_DIR = 'lighthouse-reports';

const ROUTES = [
  { path: '/en', name: 'home' },
  { path: '/en/about', name: 'about' },
  { path: '/en/services', name: 'services' },
  { path: '/en/blog', name: 'blog' },
  { path: '/en/faq', name: 'faq' },
  { path: '/en/contact', name: 'contact' },
];

mkdirSync(OUT_DIR, { recursive: true });

const results = [];

for (const { path, name } of ROUTES) {
  const url = `${BASE}${path}`;
  console.log(`\nAuditing ${url}...`);

  for (const [form, args] of [
    ['mobile', '--form-factor=mobile --screenEmulation.mobile=true'],
    ['desktop', '--preset=desktop'],
  ]) {
    const out = join(OUT_DIR, `${name}-${form}.json`);
    try {
      execSync(
        `npx lighthouse "${url}" --only-categories=performance,accessibility,best-practices,seo ${args} --output=json --output-path="${out}" --chrome-flags="--headless=new --no-sandbox" --quiet`,
        { stdio: 'inherit' }
      );
      const report = JSON.parse(readFileSync(out, 'utf8'));
      const scores = Object.fromEntries(
        ['performance', 'accessibility', 'best-practices', 'seo'].map((k) => [
          k,
          Math.round(report.categories[k].score * 100),
        ])
      );
      const vitals = {
        lcp: report.audits['largest-contentful-paint']?.displayValue,
        fcp: report.audits['first-contentful-paint']?.displayValue,
        tbt: report.audits['total-blocking-time']?.displayValue,
        cls: report.audits['cumulative-layout-shift']?.displayValue,
      };
      results.push({ route: name, form, scores, vitals, url });
      console.log(`  ${form}:`, scores, vitals);
    } catch {
      console.error(`  ${form} failed for ${name}`);
    }
  }
}

writeFileSync(
  join(OUT_DIR, 'summary.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), baseUrl: BASE, results }, null, 2)
);
console.log(`\nSummary: ${OUT_DIR}/summary.json`);
