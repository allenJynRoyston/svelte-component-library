import { writable } from 'svelte/store';

const showExample = writable(true);
const showImport = writable(true);
const showProperties = writable(true);

function siteInit() {
	return {
		showImport,
		showProperties,
		showExample,
	};
}

export const LibraryStore = siteInit();
