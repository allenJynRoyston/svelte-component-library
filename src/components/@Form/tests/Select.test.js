import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import Select from '../Select.svelte';

const changeSelectValue = async (value) => {
	userEvent.selectOptions(screen.getByTestId('select'), value);
	await new Promise((r) => setTimeout(r, 1));
};

describe('Select component', () => {
	let onChange;

	describe(`Select - no defaults`, () => {
		let ele;
		onChange = jest.fn();

		beforeEach(() => {
			const props = {
				label: 'label',
				key: 'key',
			};
			ele = render(Select, { ...props });
		});

		test('... label is rendered', () => {
			expect(ele.getByText('label')).toBeInTheDocument();
		});
	});

	describe(`Select w/props`, () => {
		let ele;

		afterEach(() => {
			jest.clearAllMocks;
		});

		beforeEach(() => {
			const props = {
				label: 'Select',
				key: 'select',
				value: null,
				defaultOption: 'Select an option',
				options: [
					{ id: 1, title: 'option 1' },
					{ id: 2, title: 'option 2' },
					{ id: 3, title: 'option 3' },
					{ id: 4, title: 'option 4' },
				],
				onInitFilter: (val, options) => {
					return options.find((x) => x.id === val);
				},
				onChangeFilter: (val) => {
					return val && val.title;
				},
				required: true,
			};
			ele = render(Select, { ...props });
		});

		test('... label is rendered', () => {
			expect(ele.getByText('Select')).toBeInTheDocument();
		});
		it('... it should render all options', () => {
			expect(screen.getAllByRole('option').length).toBe(5);
		});

		test('... selecting an option works', async () => {
			await changeSelectValue('option 1');
			expect(screen.getByTestId('option-0').selected).toBe(true);
			expect(screen.getByTestId('option-1').selected).toBe(false);
			expect(screen.getByTestId('option-2').selected).toBe(false);
			expect(screen.getByTestId('option-3').selected).toBe(false);

			await changeSelectValue('option 3');
			expect(screen.getByTestId('option-0').selected).toBe(false);
			expect(screen.getByTestId('option-1').selected).toBe(false);
			expect(screen.getByTestId('option-2').selected).toBe(true);
			expect(screen.getByTestId('option-3').selected).toBe(false);
		});

		test('... value is required', async () => {
			let e = screen.getByTestId('select-container');
			expect(e).toHaveClass('invalid');
			await changeSelectValue('option 1');
			expect(e).toHaveClass('valid');
		});
	});
});
