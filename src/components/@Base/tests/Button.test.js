import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import Button from '../Button.svelte';

describe('Button component', () => {
	test('should render component correctly (no defaults)', () => {
		const { getByText } = render(Button);
		expect(getByText('Button')).toBeInTheDocument();
	});
});
