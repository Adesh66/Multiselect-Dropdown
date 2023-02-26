export const getFromToCache = async (cacheName, url) => {
    if ('caches' in window) {
        const cacheStorage = await caches.open(cacheName);
        const cachedResponse = await cacheStorage.match(url);
        if (cachedResponse !== undefined) {
            return await cachedResponse.json();
        }
        return null;
    }
};
export const addToCache = (cacheName, url, response) => {
    if ('caches' in window) {
        const data = new Response(JSON.stringify(response));
        caches.open(cacheName).then((cache) => {
            cache.put(url, data);
        });
    }
};
