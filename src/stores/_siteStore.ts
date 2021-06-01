import { writable } from 'svelte/store';

export const urlHash = writable(null);
export const urlParams = writable(null);
export const openSidebar = writable(true);
export const openNotch = writable(false);
export const searchValue = writable(null);

function siteInit() {
	return {
		urlHash,
		urlParams,
		openSidebar,
		openNotch,
		searchValue,
	};
}

export const SiteStore = siteInit();
