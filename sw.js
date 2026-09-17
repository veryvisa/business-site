/* 宏利产品怎么选 · 张毛妈 · 离线缓存。版本＝内容哈希，新发布自动汰旧。 */
const CACHE_PREFIX = 'vv-business-';
const VERSION = CACHE_PREFIX + '5ce2df4b1e93';
const PRECACHE = ["./.nojekyll", "./about.html", "./compare/cash-advantage-vs-gic.html", "./compare/manulife-one-vs-advantage.html", "./compare/move-and-spend-money.html", "./index.html", "./products/manulife-advantage-account.html", "./products/manulife-gic.html", "./products/manulife-one.html", "./products/manulife-term-life.html", "./products/manulife-transfers-wire.html", "./products/manulife-visa-cards.html", "./robots.txt", "./search.json", "./sitemap.xml", "./style.css", "./tax/borrowing-interest-deductible.html", "./tax/interest-income-and-t5.html", "./tax/life-insurance-money-and-tax.html", "./manifest.webmanifest"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then(async (c) => {
    for (const u of PRECACHE) { try { await c.add(new Request(u, {cache: 'reload'})); } catch (_) {} }
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith(CACHE_PREFIX) && k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(fetch(req).then((r) => { const cp = r.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); return r; })
      .catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))));
  } else {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => {
      const cp = res.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); return res; })));
  }
});
