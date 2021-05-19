import { writable } from 'svelte/store';

export const openSidebar = writable(false);

function siteInit() {
	return {
		openSidebar,
	};
}

export const SiteStore = siteInit();
