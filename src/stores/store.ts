import { writable, readable } from 'svelte/store';

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
