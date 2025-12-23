import { writable } from 'svelte/store';

import { getUserImage } from '../utils/miniappInitializer.ts';
import { openDB, getRecipeCountDB, getSavedRecipeCount } from './MyRecipe.ts';

export const userName = writable<string>('User');
export const recipeCount = writable<number>(0);
export const savedRecipeCount = writable<number>(0);
export const userImage = writable<string | null>(null);

export async function getUserDetail() {
	const userStr = localStorage?.getItem('user');
	let user: any = null;

	if (userStr) {
		try {
			user = JSON.parse(userStr);
		} catch (error) {
			console.error('Error parsing user data:', error);
		}
	}

	if (!user) {
		const miniAppProfileStr = localStorage?.getItem('mini-app-profile');
		if (miniAppProfileStr) {
			try {
				const fullProfile = JSON.parse(miniAppProfileStr);
				user = fullProfile?.user_profile;
			} catch (err) {
				console.error('Error parsing mini-app-profile:', err);
			}
		}
	}

	if (user) {
		console.log('getUserDetail: Found user data:', user);
		userName.set(user.display_name || 'User');

		if (user.photo_url) {
			userImage.set(user.photo_url);
			console.log('User image URL set to:', user.photo_url);
		} else {
			console.log('No photo_url found in user object');
		}
	} else {
		console.log('getUserDetail: No user data found in localStorage');
		userName.set('User');
	}

	// if (!userImage) {
	// 	getImage = getUserImage();
	// 	userImage.set(getImage );
	// 	console.log('Fallback getUserImage result:', userImage);
	// }
	console.log('localStorage user =', localStorage.getItem('user'));
	console.log('photo_url =', user?.photo_url);

	try {
		await openDB();
		const count = await getRecipeCountDB();
		recipeCount.set(count);

		// Get saved recipe count
		const savedCount = await getSavedRecipeCount();
		savedRecipeCount.set(savedCount);
	} catch (error) {
		console.error('Error fetching recipe count:', error);
	}
}
