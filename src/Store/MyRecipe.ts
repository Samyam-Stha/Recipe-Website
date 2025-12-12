import { writable } from 'svelte/store';

export const savedRecipes = writable<any[]>([]);

let db: IDBDatabase;

export function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open('recipesDB', 1);

		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains('recipes')) {
				db.createObjectStore('recipes', { keyPath: 'idMeal' });
			}
		};

		request.onsuccess = () => {
			db = request.result;
			resolve(db);
		};

		request.onerror = () => reject(request.error);
	});
}

export function fetchRecipes() {
	return new Promise((resolve, reject) => {
		const tx = db.transaction('recipes', 'readonly');
		const store = tx.objectStore('recipes');
		const request = store.getAll();

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

