import { writable } from 'svelte/store';

const showExample = writable(true);
const showImport = writable(true);
const showProperties = writable(true);
const showCode = writable(true);

function siteInit() {
	return {
		showImport,
		showProperties,
		showExample,
		showCode,
	};
}

export const LibraryStore = siteInit();
