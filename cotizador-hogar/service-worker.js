const CACHE='cotizador-hogar-v25';
const ASSETS=[
  '/',
  '/index.html?v=25',
  '/app.css?v=25',
  '/app.js?v=25',
  '/includes.html',
  '/manifest.webmanifest?v=25',
  '/icon-app.webp?v=25',
  '/assets/approved-logo.js?v=25',
  '/assets/approved-hero-01.js?v=25',
  '/assets/approved-hero-02.js?v=25',
  '/assets/apply-approved-assets.js?v=25'
];
self.addEventListener('install',(event)=>{
  event.waitUntil(caches.open(CACHE).then((cache)=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',(event)=>{
  event.waitUntil(caches.keys().then((keys)=>Promise.all(keys.filter((key)=>key!==CACHE).map((key)=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',(event)=>{
  if(event.request.method!=='GET')return;
  event.respondWith(fetch(event.request).then((response)=>{
    const copy=response.clone();
    caches.open(CACHE).then((cache)=>cache.put(event.request,copy));
    return response;
  }).catch(()=>caches.match(event.request).then((response)=>response||caches.match('/index.html?v=25'))));
});
