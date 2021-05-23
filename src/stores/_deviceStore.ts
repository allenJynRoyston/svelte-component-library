import { readable, writable, derived } from 'svelte/store';

// device detection
const appWidth = writable(0);

function deviceStoreInit() {
	return {
		appWidth,
		isMobile: derived(appWidth, ($appWidth) => {
			return $appWidth >= 0 && $appWidth < 480;
		}),
		isTablet: derived(appWidth, ($appWidth) => {
			return $appWidth >= 480 && $appWidth < 768;
		}),
		isTabletAndBelow: derived(appWidth, ($appWidth) => {
			return $appWidth < 768;
		}),
		isDesktop: derived(appWidth, ($appWidth) => {
			return $appWidth >= 768;
		}),
		isNativeMobile: readable(
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			),
			() => {}
		),
		isLocalDev: readable(location.host.includes('localhost'), () => {}),
	};
}

export const DeviceStore = deviceStoreInit();
