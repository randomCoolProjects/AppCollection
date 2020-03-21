const staticResources = [

    './index.html',
    //'./appLoad.html',
    './manifest.json',

    //3rd party:

    'https://unpkg.com/sweetalert/dist/sweetalert.min.js',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',

];

const CACHE_NAME = 'appgen-cache';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(staticResources);
        })
    )
});

self.addEventListener('activate', function activator(event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys
                .filter(function (key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function (key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

function tryFetch(req) {
    try {
        return fetch(req)
            .then(value => {
                return value;
            })
            .catch(why => {
                if (req.url.includes('.html') && !req.url.includes('?offline=true')) {
                    return Response.redirect(req.url + '?offline=true');
                }
                return Response.error();
            });
    }
    catch{
        return Response.error();
    }
}

self.addEventListener('fetch', function (event) {
    var req = event.request;
    event.respondWith(
        caches.match(req).then(function (cachedResponse) {
            return cachedResponse || tryFetch(req);
        })
    );
});
