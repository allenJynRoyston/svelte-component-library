import { writable } from 'svelte/store';

export const urlHash = writable(null);
export const urlParams = writable(null);
export const searchValue = writable(null);
export const openNotch = writable(localStorage.getItem('openNotch') === 'true');
export const openSidebar = writable(
	localStorage.getItem('openSidebar') === 'true'
);

function siteInit() {
	return {
		urlHash,
		urlParams,
		openSidebar,
		openNotch,
		searchValue,
	};
}

openSidebar.subscribe((val) =>
	localStorage.setItem('openSidebar', String(val))
);

openNotch.subscribe((val) => {
	localStorage.setItem('openNotch', String(val));
});

export const SiteStore = siteInit();
