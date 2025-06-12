
const CACHE_NAME = 'digiketab-v1.0.0';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/lovable-uploads/045f5698-67df-4c57-ba47-ead9a49ac21d.png',
  '/manifest.json'
];

// نصب Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache باز شد');
        return cache.addAll(urlsToCache);
      })
  );
});

// دریافت درخواست‌ها
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // اگر در cache وجود دارد، آن را برگردان
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // بررسی اعتبار پاسخ
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // کلون پاسخ برای cache
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// به‌روزرسانی cache
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// پیام‌های sync برای آفلاین
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // همگام‌سازی داده‌های آفلاین
  return new Promise(function(resolve) {
    // کد همگام‌سازی
    console.log('همگام‌سازی پس‌زمینه انجام شد');
    resolve();
  });
}
