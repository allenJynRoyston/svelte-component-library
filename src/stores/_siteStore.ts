import { writable } from 'svelte/store';

//-------------------------------
// localstorage setup
const lsName = 'siteStore';
const ls = !!localStorage.getItem(lsName)
	? // pull from ls
	  JSON.parse(localStorage.getItem(lsName))
	: // defaults
	  {
			urlHash: null,
			urlParams: null,
			searchValue: null,
			openNotch: true,
			openSidebar: true,
	  };

const _store = {
	urlHash: ls.urlHash,
	urlParams: ls.urlParams,
	searchValue: ls.searchValue,
	openNotch: ls.openNotch,
	openSidebar: ls.openSidebar,
};
//-------------------------------

//-------------------------------
// create/export store
export const urlHash = writable(_store.urlHash);
export const urlParams = writable(_store.urlParams);
export const searchValue = writable(_store.searchValue);
export const openNotch = writable(_store.openNotch);
export const openSidebar = writable(_store.openSidebar);

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
//-------------------------------

//-------------------------------
// subscribe to watch for changes
openNotch.subscribe((val) => {
	_store.openNotch = val;
});

openSidebar.subscribe((val) => {
	_store.openSidebar = val;
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
