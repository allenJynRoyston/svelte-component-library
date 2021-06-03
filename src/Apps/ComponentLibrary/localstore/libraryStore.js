import { writable } from 'svelte/store';

//-------------------------------
// localstorage setup
const lsName = 'libraryStore';
const ls = !!localStorage.getItem(lsName)
	? // pull from ls
	  JSON.parse(localStorage.getItem(lsName))
	: // defaults
	  {
			showImport: true,
			showProperties: true,
			showExample: true,
			showCode: true,
			showActions: true,
	  };

const _store = {
	showImport: ls.showImport,
	showProperties: ls.showProperties,
	showExample: ls.showExample,
	showCode: ls.showCode,
	showActions: ls.showActions,
};
//-------------------------------

//-------------------------------
// create/export store
const showExample = writable(_store.showExample);
const showImport = writable(_store.showImport);
const showProperties = writable(_store.showProperties);
const showCode = writable(_store.showCode);
const showActions = writable(_store.showActions);

function siteInit() {
	return {
		showImport,
		showProperties,
		showExample,
		showCode,
		showActions,
	};
}

export const LibraryStore = siteInit();
//-------------------------------

//-------------------------------
// subscribe to watch for changes
showImport.subscribe((val) => {
	_store.showImport = val;
});

showProperties.subscribe((val) => {
	_store.showProperties = val;
});

showExample.subscribe((val) => {
	_store.showExample = val;
});

showCode.subscribe((val) => {
	_store.showCode = val;
});

showActions.subscribe((val) => {
	_store.showActions = val;
});
//-------------------------------

//-------------------------------
// remove after loaded
localStorage.removeItem(lsName);
//-------------------------------

//-------------------------------
// save
window.addEventListener('beforeunload', () => {
	localStorage.setItem(lsName, JSON.stringify(_store));
});
//-------------------------------
