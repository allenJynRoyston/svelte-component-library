import { writable } from 'svelte/store';

const showExample = writable(false);
const showImport = writable(false);
const showProperties = writable(false);

function siteInit() {
	return {
		showImport,
		showProperties,
		showExample,
	};
}

export const LibraryStore = siteInit();
