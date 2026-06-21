import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import compression from 'compression';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isTest = process.env.VITEST;
const isProd = process.env.NODE_ENV === 'production';

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort
) {
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : '';

  const app = express();
  app.use(compression());

  let vite;
  if (!isProd) {
    vite = await import('vite').then((m) =>
      m.createServer({
        root,
        logLevel: isTest ? 'error' : 'info',
        server: {
          middlewareMode: true,
          watch: {
            usePolling: true,
            interval: 100,
          },
          hmr: {
            port: hmrPort,
          },
        },
        appType: 'custom',
      })
    );
    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      })
    );
  }

  // --- Sitemap Endpoint ---
  app.get('/sitemap.xml', async (req, res) => {
    try {
      res.setHeader('Content-Type', 'application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      
      const baseUrl = 'https://winz.be';
      const languages = ['en', 'fr', 'de', 'nl'];
      
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;
      
      const addUrl = (loc, priority = '0.8', changefreq = 'weekly') => {
        let entry = `  <url>\n`;
        entry += `    <loc>${baseUrl}${loc}</loc>\n`;
        entry += `    <changefreq>${changefreq}</changefreq>\n`;
        entry += `    <priority>${priority}</priority>\n`;
        
        // Add hreflang for all supported languages
        languages.forEach(lang => {
          entry += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${baseUrl}/${lang}${loc}" />\n`;
        });
        // Default x-default
        entry += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en${loc}" />\n`;
        
        entry += `  </url>\n`;
        xml += entry;
      };

      // Add static routes
      addUrl('/', '1.0', 'daily');
      addUrl('/about', '0.8', 'monthly');
      addUrl('/services', '0.9', 'weekly');
      addUrl('/contact', '0.8', 'monthly');
      addUrl('/import', '0.8', 'monthly');
      addUrl('/export', '0.8', 'monthly');
      addUrl('/transit', '0.8', 'monthly');
      addUrl('/transport', '0.8', 'monthly');
      addUrl('/warehouse', '0.8', 'monthly');
      addUrl('/blog', '0.9', 'daily');
      addUrl('/categories', '0.8', 'weekly');
      addUrl('/faq', '0.8', 'weekly');

      // Fetch dynamic content
      const API_BASE = process.env.VITE_API_BASE_URL || 'https://trucway.com';
      try {
        const [blogsRes, faqsRes, catsRes] = await Promise.all([
          fetch(`${API_BASE}/api/news/blogs/`),
          fetch(`${API_BASE}/api/news/faqs/`),
          fetch(`${API_BASE}/api/news/categories/`)
        ]);

        if (blogsRes.ok) {
          const blogs = await blogsRes.json();
          const items = Array.isArray(blogs) ? blogs : blogs.data || [];
          items.forEach(blog => addUrl(`/blog/${blog.slug}`, '0.7', 'weekly'));
        }

        if (faqsRes.ok) {
          const faqs = await faqsRes.json();
          const items = Array.isArray(faqs) ? faqs : faqs.data || [];
          items.forEach(faq => addUrl(`/faq/${faq.slug}`, '0.6', 'monthly'));
        }

        if (catsRes.ok) {
          const cats = await catsRes.json();
          const items = Array.isArray(cats) ? cats : cats.data || [];
          items.forEach(cat => {
            addUrl(`/categories/${cat.slug}`, '0.7', 'weekly');
            if (cat.subcategories && Array.isArray(cat.subcategories)) {
              cat.subcategories.forEach(sub => {
                addUrl(`/subcategories/${sub.slug}`, '0.6', 'weekly');
              });
            }
          });
        }
      } catch (err) {
        console.error('Error fetching dynamic sitemap URLs:', err);
      }

      xml += `</urlset>`;
      res.status(200).send(xml);
    } catch (e) {
      console.error(e);
      res.status(500).end('Error generating sitemap');
    }
  });

  // --- Robots.txt Endpoint ---
  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(`User-agent: *\nAllow: /\n\nSitemap: https://winz.be/sitemap.xml\n`);
  });

  // --- SSR Render Endpoint ---
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
      } else {
        template = indexProd;
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const context = {};
      const { html: appHtml, helmet } = await render(url, context);

      if (context.url) {
        return res.redirect(301, context.url);
      }

      const helmetHead = helmet
        ? \`
          \${helmet.title.toString()}
          \${helmet.meta.toString()}
          \${helmet.link.toString()}
          \${helmet.script.toString()}
        \`
        : '';

      const html = template
        .replace('<!--app-head-->', helmetHead)
        .replace('<!--app-html-->', appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(5174, () => {
      console.log('http://localhost:5174');
    })
  );
}
