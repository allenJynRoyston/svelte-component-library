import { writable, readable, derived } from 'svelte/store';

// device detection
export const appWidth = writable(0);
export const isMobile = derived(appWidth, ($appWidth) => {
	return $appWidth >= 0 && $appWidth < 480;
});
export const isTablet = derived(appWidth, ($appWidth) => {
	return $appWidth >= 480 && $appWidth < 768;
});
export const isDesktop = derived(appWidth, ($appWidth) => {
	return $appWidth >= 768;
});

// nav sidebar
export const openSidebar = writable(false);

// modal
export const openModal = writable(false);
export const modalBusy = writable(false);
export const modalProps = writable(null);
export const onModalSubmit = writable(null);

// localDev
export const isLocalDev = readable(
	location.host.includes('localhost'),
	() => {}
);
