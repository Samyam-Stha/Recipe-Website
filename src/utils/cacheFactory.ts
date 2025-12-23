import AppCache from '@/store/cache/cache-implementation/app-cache-implementation';
import { IdbCache } from '@/store/cache/cache-implementation/idb-cache-implementation';
import LocalCache from '@/store/cache/cache-implementation/local-cache-implementation';
import { MiniappPlatform } from '@/utils/miniAppSdk';
import type { ICache } from '@/store/cache/cache-definitions';
import { AppBundleSdk } from '@/mini-app/appBundleSdk';

const TAG = '[CacheFactory]';

class CacheFactory {
	appCache: ICache = new AppCache();
	IDBCache: ICache = new IdbCache();

	constructor() {}

	private debug(platform: string, ...args: any[]) {
		// Always surface on iOS to help diagnose performance issues, otherwise be quiet.
		try {
			console.log(TAG, ...args);
		} catch (_) {
			console.log('Error logged in cachefactory is', _);
		}
	}

	private async getCacheByPlatform() {
		const t0 = performance.now?.() ?? Date.now();
		await AppBundleSdk.getInstance();
		const platform = AppBundleSdk.getPlatform();
		let backend: 'AppCache' | 'IDBCache' = 'IDBCache';
		let cache: ICache;

		switch (platform) {
			case MiniappPlatform.IOS:
			case MiniappPlatform.ANDROID:
				backend = 'AppCache';
				cache = this.appCache;
				break;
			case MiniappPlatform.BROWSER:
			default:
				backend = 'IDBCache';
				cache = this.IDBCache;
		}

		const t1 = performance.now?.() ?? Date.now();
		this.debug(platform, 'getCacheByPlatform', {
			platform,
			backend,
			durationMs: +(t1 - t0).toFixed(2)
		});
		return cache;
	}

	async contains(key: string): Promise<boolean> {
		const t0 = performance.now?.() ?? Date.now();
		const platform = AppBundleSdk.getPlatform();
		const cache = await this.getCacheByPlatform();
		const result = await cache.contains(key);
		const t1 = performance.now?.() ?? Date.now();
		this.debug(platform, 'contains', { key, hit: result, durationMs: +(t1 - t0).toFixed(2) });
		return result;
	}

	async get(key: string): Promise<string | null> {
		const t0 = performance.now?.() ?? Date.now();
		const platform = AppBundleSdk.getPlatform();
		const cache = await this.getCacheByPlatform();
		const value = await cache.get(key);
		const t1 = performance.now?.() ?? Date.now();
		this.debug(platform, 'get', {
			key,
			result: value ? 'HIT' : 'MISS',
			valueSize:
				typeof value === 'string' ? value.length : value ? JSON.stringify(value).length : 0,
			durationMs: +(t1 - t0).toFixed(2)
		});
		return value;
	}

	async getAnonymousUserCache(key: string): Promise<string | null> {
		const t0 = performance.now?.() ?? Date.now();
		const platform = AppBundleSdk.getPlatform();
		const cache = await this.getCacheByPlatform();
		const value = await cache.getAnonymousUserCache(key);
		const t1 = performance.now?.() ?? Date.now();
		this.debug(platform, 'getAnonymousUserCache', {
			key,
			result: value ? 'HIT' : 'MISS',
			valueSize:
				typeof value === 'string' ? value.length : value ? JSON.stringify(value).length : 0,
			durationMs: +(t1 - t0).toFixed(2)
		});
		return value;
	}

	async clearFromAnonymousCache(key: string): Promise<void> {
		const t0 = performance.now?.() ?? Date.now();
		const platform = AppBundleSdk.getPlatform();
		const cache = await this.getCacheByPlatform();
		await cache.clearFromAnonymousCache(key);
		const t1 = performance.now?.() ?? Date.now();
		this.debug(platform, 'clearFromAnonymousCache', { key, durationMs: +(t1 - t0).toFixed(2) });
	}

	async put(
		key: string,
		value: string | any,
		ttl?: number | undefined,
		localSave?: boolean | undefined
	): Promise<string | null | void> {
		const t0 = performance.now?.() ?? Date.now();
		const platform = AppBundleSdk.getPlatform();
		if (localSave) {
			LocalCache.put(key, value, ttl);
			this.debug(platform, 'localSave.put', {
				key,
				valueSize:
					typeof value === 'string' ? value.length : value ? JSON.stringify(value).length : 0,
				ttl
			});
		}
		const cache = await this.getCacheByPlatform();
		const res = await cache.put(key, value, ttl);
		const t1 = performance.now?.() ?? Date.now();
		this.debug(platform, 'put', {
			key,
			valueSize:
				typeof value === 'string' ? value.length : value ? JSON.stringify(value).length : 0,
			ttl,
			durationMs: +(t1 - t0).toFixed(2)
		});
		return res;
	}

	async delete(key: string): Promise<void> {
		const t0 = performance.now?.() ?? Date.now();
		const platform = AppBundleSdk.getPlatform();
		const cache = await this.getCacheByPlatform();
		await cache.delete(key);
		const t1 = performance.now?.() ?? Date.now();
		this.debug(platform, 'delete', { key, durationMs: +(t1 - t0).toFixed(2) });
	}

	async clear(): Promise<void> {
		const t0 = performance.now?.() ?? Date.now();
		const platform = AppBundleSdk.getPlatform();
		const cache = await this.getCacheByPlatform();
		await cache.clear();
		const t1 = performance.now?.() ?? Date.now();
		this.debug(platform, 'clear', { durationMs: +(t1 - t0).toFixed(2) });
	}
}
export default CacheFactory;
