/* 宏利产品怎么选 · 张毛妈 · 离线缓存。版本＝内容哈希，新发布自动汰旧。 */
const CACHE_PREFIX = 'vv-business-';
const VERSION = CACHE_PREFIX + 'fcda69230ae6';
const PRECACHE = ["./.nojekyll", "./about.html", "./cards/home-a/index.html", "./cards/index.html", "./cards/manulife-advantage-account-a/index.html", "./cards/manulife-advantage-account-b/index.html", "./compare/cash-advantage-vs-gic.html", "./compare/gic-vs-gia.html", "./compare/manulife-one-vs-advantage.html", "./compare/move-and-spend-money.html", "./img/cards/home-a.png", "./img/cards/home-a.t.jpg", "./img/cards/manulife-advantage-account-a.png", "./img/cards/manulife-advantage-account-a.t.jpg", "./img/cards/manulife-advantage-account-b.png", "./img/cards/manulife-advantage-account-b.t.jpg", "./index.html", "./products/manulife-advantage-account.html", "./products/manulife-critical-illness.html", "./products/manulife-disability.html", "./products/manulife-gic.html", "./products/manulife-health-dental.html", "./products/manulife-one.html", "./products/manulife-par-whole-life.html", "./products/manulife-term-life.html", "./products/manulife-transfers-wire.html", "./products/manulife-universal-life.html", "./products/manulife-visa-cards.html", "./products/manulife-vitality.html", "./robots.txt", "./search.json", "./sitemap.xml", "./style.css", "./tax/borrowing-interest-deductible.html", "./tax/charitable-giving-and-insurance.html", "./tax/corporate-owned-life-insurance.html", "./tax/interest-income-and-t5.html", "./tax/life-insurance-money-and-tax.html", "./tax/probate-by-province.html", "./tax/registered-accounts-at-death.html", "./manifest.webmanifest"];
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
