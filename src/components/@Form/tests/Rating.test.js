import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/svelte';

import Rating from '../Rating.svelte';

const selectValue = async (index) => {
	fireEvent.click(screen.getByTestId(`rating-btn-${index}`));
	await new Promise((r) => setTimeout(r, 1));
};

describe('Rating component', () => {
	describe(`Rating - no defaults`, () => {
		let ele;

		beforeEach(() => {
			const props = {
				label: 'label',
				key: 'key',
				value: false,
			};
			ele = render(Rating, { ...props });
		});

		test('... label is rendered', () => {
			expect(ele.getByText('label')).toBeInTheDocument();
		});
	});

	describe(`Rating w/props`, () => {
		let ele, props;

		beforeEach(() => {
			props = {
				label: 'Rating',
				key: 'ratings',
				value: 2,
				required: true,
				maxLength: 10,
				fixedWidth: '40px',
				slots: {
					selected: 'X',
					notSelected: '-',
				},
			};
			ele = render(Rating, { ...props });
		});

		test('... label is rendered', () => {
			expect(ele.getByText('Rating')).toBeInTheDocument();
		});

		it('... it should render all options', async () => {
			let res = await screen.findAllByRole('button');
			expect(res.length).toBe(props.maxLength);
		});

		test('... value is correct', () => {
			expect(screen.getByTestId(`rating-btn-${props.value}`)).toHaveTextContent(
				'X'
			);
			expect(
				screen.getByTestId(`rating-btn-${props.value - 1}`)
			).toHaveTextContent('X');
			expect(
				screen.getByTestId(`rating-btn-${props.value + 1}`)
			).toHaveTextContent('-');
		});

		test('... changing the value works correctly', async () => {
			let targetId = 8;
			await selectValue(targetId);
			expect(screen.getByTestId(`rating-btn-${targetId}`)).toHaveTextContent(
				'X'
			);
			expect(
				screen.getByTestId(`rating-btn-${targetId - 1}`)
			).toHaveTextContent('X');
			expect(
				screen.getByTestId(`rating-btn-${targetId + 1}`)
			).toHaveTextContent('-');

			targetId = 3;
			await selectValue(targetId);
			expect(screen.getByTestId(`rating-btn-${targetId}`)).toHaveTextContent(
				'X'
			);
			expect(
				screen.getByTestId(`rating-btn-${targetId - 1}`)
			).toHaveTextContent('X');
			expect(
				screen.getByTestId(`rating-btn-${targetId + 1}`)
			).toHaveTextContent('-');
		});

		test('... selecting the current value will deselect all', async () => {
			let targetId = props.value;
			await selectValue(targetId);
			expect(screen.getByTestId(`rating-btn-${targetId}`)).toHaveTextContent(
				'-'
			);
			expect(
				screen.getByTestId(`rating-btn-${targetId - 1}`)
			).toHaveTextContent('-');
			expect(
				screen.getByTestId(`rating-btn-${targetId + 1}`)
			).toHaveTextContent('-');

			// toggle all on
			targetId = props.maxLength;
			await selectValue(targetId);
			for (let i = 1; i < props.maxLength; i++) {
				expect(screen.getByTestId(`rating-btn-${i}`)).toHaveTextContent('X');
			}

			// toggle all off
			targetId = props.maxLength;
			await selectValue(targetId);
			for (let i = 1; i < props.maxLength; i++) {
				expect(screen.getByTestId(`rating-btn-${i}`)).toHaveTextContent('-');
			}
		});
	});
});
