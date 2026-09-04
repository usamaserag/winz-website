import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist/client');
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.winz.be';
const SITE_URL = 'https://winz.be';

const STATIC_ROUTES = [
  '/', '/about', '/services', '/import', '/export', '/transit',
  '/transport', '/warehouse', '/blog', '/faq', '/categories',
  '/contact', '/privacy-policy', '/cookies-policy'
];

async function fetchFromApi(endpoint) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (err) {
    console.error(`Failed to fetch ${endpoint}:`, err.message);
    return [];
  }
}

async function run() {
  console.log('Starting SEO Build process...');
  
  // 1. Fetch Dynamic Data
  console.log('Fetching dynamic data...');
  const blogs = await fetchFromApi('/api/news/blogs/');
  const categories = await fetchFromApi('/api/news/categories/');
  const subcategories = await fetchFromApi('/api/news/subcategories/');
  const faqs = await fetchFromApi('/api/news/faqs/');

  // 2. Build Route List
  const routes = [];
  
  // Add static routes for both languages
  for (const lang of ['en', 'fr', 'de', 'nl']) {
    for (const route of STATIC_ROUTES) {
      routes.push({
        path: `/${lang}${route === '/' ? '' : route}`,
        title: 'WINZ - Your Lightning Fast Delivery Partner',
        description: 'WINZ represents a logistics and transportation company specialized in local shipping, international cargo, and fast delivery services.'
      });
    }

    // Add blogs
    blogs.forEach(b => {
      routes.push({
        path: `/${lang}/blog/${b.slug}`,
        title: b.seo?.title || b.title,
        description: b.seo?.description || b.summary,
        image: b.image ? `${API_BASE_URL}${b.image}` : null
      });
    });

    // Add categories
    categories.forEach(c => {
      routes.push({
        path: `/${lang}/categories/${c.slug}`,
        title: c.seo?.title || c.title || c.name,
        description: c.seo?.description || c.description
      });
    });

    // Add subcategories
    subcategories.forEach(s => {
      routes.push({
        path: `/${lang}/subcategories/${s.slug}`,
        title: s.seo?.title || s.title || s.name,
        description: s.seo?.description || s.description
      });
    });
    
    // Add faqs
    faqs.forEach(f => {
      routes.push({
        path: `/${lang}/faq/${f.slug}`,
        title: f.seo?.title || f.question,
        description: f.seo?.description || f.answer
      });
    });
  }

  // 3. Generate Sitemap
  console.log('Generating sitemap.xml...');
  const escapeXml = (unsafe) => (unsafe || '').replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
    }
  });

  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;
  
  routes.forEach(route => {
    sitemapContent += `  <url>\n    <loc>${escapeXml(SITE_URL + route.path)}</loc>\n`;
    // Add alternates
    for (const altLang of ['en', 'fr', 'de', 'nl']) {
      if (altLang !== route.path.split('/')[1]) {
        const altPath = route.path.replace(/^\/(en|fr|de|nl)/, `/${altLang}`);
        sitemapContent += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${escapeXml(SITE_URL + altPath)}" />\n`;
      }
    }
    sitemapContent += `  </url>\n`;
  });
  sitemapContent += `</urlset>`;
  
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapContent);

  // 4. Pre-render HTML files (inject meta tags)
  console.log('Pre-rendering HTML shells...');
  const baseHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.error('index.html not found in dist/client. Make sure Vite build ran first.');
    process.exit(1);
  }
  
  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

  routes.forEach(route => {
    const routeDir = path.join(DIST_DIR, route.path);
    fs.mkdirSync(routeDir, { recursive: true });
    
    let html = baseHtml;
    
    // Create meta tags
    const cleanTitle = (route.title || 'WINZ').replace(/"/g, '&quot;');
    const cleanDesc = (route.description || '').replace(/"/g, '&quot;');
    const canonical = `${SITE_URL}${route.path}`;
    const image = route.image || `${SITE_URL}/favicon.png`;
    
    const metaTags = `
      <title>${cleanTitle}</title>
      <meta name="description" content="${cleanDesc}" />
      <link rel="canonical" href="${canonical}" />
      <meta property="og:title" content="${cleanTitle}" />
      <meta property="og:description" content="${cleanDesc}" />
      <meta property="og:url" content="${canonical}" />
      <meta property="og:image" content="${image}" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${cleanTitle}" />
      <meta name="twitter:description" content="${cleanDesc}" />
      <meta name="twitter:image" content="${image}" />
    `;
    
    // Replace existing title and description if any, or just inject before </head>
    // We'll just inject right before </head> to be safe, react-helmet-async will override later.
    // Wait, if we leave the old ones, bots might read both. Let's try to remove old title and description.
    html = html.replace(/<title>.*?<\/title>/, '');
    html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/>/, '');
    
    html = html.replace('</head>', `${metaTags}</head>`);
    
    fs.writeFileSync(path.join(routeDir, 'index.html'), html);
  });

  console.log(`SEO Build complete. Generated ${routes.length} pages.`);
}

run();
