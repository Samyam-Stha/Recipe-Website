import { globalConfig } from './globalConfig.ts';
export async function initMiniApp(retryTimes = 1): Promise<unknown> {
	try {
		const clientId = globalConfig.miniAppId;

		const miniapp = new window.hamromini_sdkjs.MiniApp();
		window.miniapp = miniapp;

		const userDetail = await window.hamromini_sdkjs.initialize(clientId, miniapp);

		if (userDetail?.user_profile) {
			localStorage?.setItem('user', JSON.stringify(userDetail?.user_profile));
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

export function getUserImage() {
	const user = localStorage?.getItem('user.photo_url');
	return user;
}

export const handleLogin = async (platform = 'google') => {
	const miniapp = (window as any)?.miniapp;
	if (!miniapp) return;
	await miniapp.login(platform);
};

export const handleLogout = async () => {
	const miniapp = (window as any)?.miniapp;
	if (!miniapp) return;

	await miniapp.logout();
	
};
