import { writable } from 'svelte/store';

export const openSidebar = writable(false);
export const urlHash = writable(null);
export const urlParams = writable(null);

function siteInit() {
	return {
		urlHash,
		urlParams,
		openSidebar,
	};
}

export const SiteStore = siteInit();
