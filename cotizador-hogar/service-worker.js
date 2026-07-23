const CACHE='cotizador-hogar-v24';
const ASSETS=[
  '/',
  '/index.html?v=24',
  '/app.css?v=24',
  '/app.js?v=24',
  '/includes.html',
  '/manifest.webmanifest?v=24',
  '/icon-app.webp?v=24',
  '/assets/approved-logo.js?v=24',
  '/assets/approved-hero-01.js?v=24',
  '/assets/approved-hero-02.js?v=24',
  '/assets/apply-approved-assets.js?v=24'
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
  }).catch(()=>caches.match(event.request).then((response)=>response||caches.match('/index.html?v=24'))));
});
