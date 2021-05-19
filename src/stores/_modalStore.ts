import { writable } from 'svelte/store';

const modalIsOpen = writable(false);
const modalProps = writable(null);
const modalIsBusy = writable(false);
const onModalSubmit = writable(null);

const setModalState = (active: boolean) => {
	if (active) {
		location.hash = `${
			location.hash.includes('&modalisopen=')
				? location.hash.split('&modalisopen=')[0]
				: location.hash
		}&modalisopen=true`;
		modalIsOpen.set(true);
	} else {
		location.hash = location.hash.split('&modalisopen=')[0];
		modalIsOpen.set(false);
	}
};

function modalStore() {
	return {
		modalIsOpen,
		modalIsBusy,
		modalProps,
		onModalSubmit,
		setModalState,
	};
}

setModalState(false);

export const ModalStore = modalStore();
