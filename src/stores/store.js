import { writable, readable } from 'svelte/store';

export const openSidebar = writable(false);

export const isLocalDev = readable(location.host.includes('localhost'));
