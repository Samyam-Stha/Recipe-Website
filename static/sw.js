const staticCacheName="static-v1";
const assets=[
	'/',
	'/src/app.html'
];

console.log("test working")


self.addEventListener('install', (evt) => {
	evt.waitUntil(
		caches.open(staticCacheName).then((cache)=>{
			console.log("caching shell assets")
			cache.addAll(assets)
		}).catch((e)=>console.log("error: ", e))
	)
});

//something

self.addEventListener('activate', (evt) => {
	console.log('service worker activated', evt);
});
