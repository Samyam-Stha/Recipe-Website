import { globalConfig } from './globalConfig.ts';
export async function initMiniApp(retryTimes = 1): Promise<unknown> {
	try {
		const clientId = globalConfig.miniAppId;

		const miniapp = new window.hamromini_sdkjs.MiniApp();
		window.miniapp = miniapp;

		const userDetail = await window.hamromini_sdkjs.initialize(clientId, miniapp);

		if (userDetail?.user_profile) {
			localStorage?.setItem('user', JSON.stringify(userDetail?.user_profile));
			// Also store in mini-app-profile for consistency
			localStorage?.setItem('mini-app-profile', JSON.stringify(userDetail));
		}

		// if (userDetail?.access_token) {
		// 	const expireTime = jwtDecode(userDetail.access_token).exp * 1000;
		// 	localStorage.setItem('exp', expireTime.toString());
		// 	localStorage.setItem(
		// 		globalConfig.localstorage_prefix + '-' + 'access-token',
		// 		userDetail.access_token
		// 	);

		// 	const currentTime = Date.now();
		// 	if (expireTime - 15 * 60000 <= currentTime) {
		// 		const newToken = await window.miniapp.getAccessToken();
		// 		localStorage.setItem(
		// 			globalConfig.localstorage_prefix + '-' + 'access-token',
		// 			newToken
		// 		);
		// 	}
		// }

		return userDetail;
	} catch (err) {
		if (retryTimes > 1) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return initMiniApp(retryTimes - 1);
		} else {
			throw err;
		}
	}
}

export function getUserImage(): string | null {
	if (typeof localStorage === 'undefined') return null;

	const userStr = localStorage.getItem('user');
	if (!userStr) {
		console.log('getUserImage: No user data in localStorage');
		return null;
	}

	try {
		const user = JSON.parse(userStr);
		const photoUrl = user?.photo_url;
		if (photoUrl && typeof photoUrl === 'string' && photoUrl.trim() !== '') {
			console.log('getUserImage: Found photo_url:', photoUrl);
			return photoUrl;
		}
		console.log('getUserImage: No valid photo_url in user object:', user);
		return null;
	} catch (error) {
		console.error('getUserImage: Error parsing user data:', error);
		return null;
	}
}

export const handleLogin = async (platform = 'google') => {
	const miniapp = (window as any)?.miniapp;
	if (!miniapp) return;
	try {
		await miniapp.login(platform);
	} catch (err) {
		throw err;
	}
};

export const handleLogout = async () => {
	const miniapp = (window as any)?.miniapp;
	if (!miniapp) return;

	await miniapp.logout();
};
