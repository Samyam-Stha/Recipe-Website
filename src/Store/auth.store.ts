import { writable } from 'svelte/store';


export const loggedIn = writable<boolean>(false);


export function getAuthState(): boolean {
	if (typeof localStorage === 'undefined') return false;
	
	try {
		const profile = JSON.parse(localStorage.getItem('mini-app-profile') ?? '{}');
		return !!profile?.user_profile;
	} catch (error) {
		console.error('Error reading auth state:', error);
		return false;
	}
}

/**
 * Initializes the auth store from localStorage
 */
export function initAuthStore(): void {
	loggedIn.set(getAuthState());
}

/**
 * Clears the authentication state
 */
export function clearAuthState(): void {
	loggedIn.set(false);
	if (typeof localStorage !== 'undefined') {
		localStorage.removeItem('mini-app-profile');
	}
}
