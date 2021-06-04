import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Input from '../Input.svelte';

const changeInputValue = async ({ label, value }) => {
	userEvent.clear(screen.getByLabelText(label));
	userEvent.type(screen.getByLabelText(label), value);
	expect(screen.getByLabelText(label)).toHaveValue(value);
	await new Promise((r) => setTimeout(r, 1));
};

describe('Input component', () => {
	['text', 'password'].forEach((type) => {
		describe(`Input (${type}) - no defaults`, () => {
			let ele;

			beforeEach(() => {
				const props = {
					type,
					label: 'label',
					key: 'key',
				};
				ele = render(Input, { ...props });
			});

			test(`... type is correct: (${type})`, () => {
				expect(ele.getByLabelText('label')).toHaveAttribute('type', type);
			});

			test('... label is rendered', () => {
				expect(ele.getByText('label')).toBeInTheDocument();
			});
			test('... value is correct', () => {
				expect(ele.getByLabelText('label').value).toBe('');
			});

			test('... regex is working correctly', async () => {
				let e = ele.container.querySelector('#key').parentElement;
				let label = 'label';
				await changeInputValue({ label, value: '123' });
				expect(e).toHaveClass('valid');
				await changeInputValue({ label, value: 'johnsmith' });
				expect(e).toHaveClass('valid');
				await changeInputValue({ label, value: '!@#' });
				expect(e).toHaveClass('valid');
			});

			test('... minLength is working correctly', async () => {
				let e = ele.container.querySelector('#key').parentElement;
				let label = 'label';
				await changeInputValue({ label, value: '' });
				expect(e).toHaveClass('valid');
				await changeInputValue({ label, value: 'johnsmith' });
				expect(e).toHaveClass('valid');
			});

			test('... maxLength is working correctly', async () => {
				let e = ele.container.querySelector('#key').parentElement;
				let label = 'label';
				await changeInputValue({
					label,
					value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
				});
				expect(e).toHaveClass('valid');
				await changeInputValue({ label, value: 'johnsmith' });
				expect(e).toHaveClass('valid');
			});

			test('... required is working correctly', async () => {
				let e = ele.container.querySelector('#key').parentElement;
				let label = 'label';
				await changeInputValue({ label, value: 'johnsmith' });
				expect(e).toHaveClass('valid');
				await changeInputValue({ label, value: '' });
				expect(e).toHaveClass('valid');
			});
		});

		describe(`Input (${type}) w/required`, () => {
			let ele;

			beforeEach(() => {
				const props = {
					type,
					label: 'Username',
					placeholder: 'john smith',
					key: 'username',
					value: 'johnsmith',
					regex: /^[a-zA-Z]+$/,
					minLength: 3,
					maxLength: 10,
					required: true,
				};
				ele = render(Input, { ...props });
			});

			test('... label is rendered', () => {
				expect(ele.getByText('Username')).toBeInTheDocument();
			});
			test('... value is correct', () => {
				expect(ele.getByLabelText('Username').value).toBe('johnsmith');
			});

			test('... regex is working correctly', async () => {
				let e = ele.container.querySelector('#username').parentElement;
				let label = 'Username';
				await changeInputValue({ label, value: '123' });
				expect(e).toHaveClass('invalid');
				await changeInputValue({ label, value: 'johnsmith' });
				expect(e).toHaveClass('valid');
				await changeInputValue({ label, value: '!@#' });
				expect(e).toHaveClass('invalid');
			});

			test('... minLength is working correctly', async () => {
				let e = ele.container.querySelector('#username').parentElement;
				let label = 'Username';
				await changeInputValue({ label, value: 'ab' });
				expect(e).toHaveClass('invalid');
				await changeInputValue({ label, value: 'johnsmith' });
				expect(e).toHaveClass('valid');
			});

			test('... maxLength is working correctly', async () => {
				let e = ele.container.querySelector('#username').parentElement;
				let label = 'Username';
				await changeInputValue({
					label,
					value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
				});
				expect(e).toHaveClass('invalid');
				await changeInputValue({ label, value: 'johnsmith' });
				expect(e).toHaveClass('valid');
			});

			test('... required is working correctly', async () => {
				let e = ele.container.querySelector('#username').parentElement;
				let label = 'Username';
				await changeInputValue({ label, value: 'johnsmith' });
				expect(e).toHaveClass('valid');
				await changeInputValue({ label, value: '' });
				expect(e).toHaveClass('invalid');
			});
		});
	});
});
