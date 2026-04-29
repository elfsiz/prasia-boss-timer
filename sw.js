// 캐시 사용 안 함 - 항상 최신 파일 사용
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // 기존 캐시 전부 삭제
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // 모든 요청을 항상 네트워크에서 가져옴
  e.respondWith(fetch(e.request));
});
