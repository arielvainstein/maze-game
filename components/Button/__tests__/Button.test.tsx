import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components';

interface Props {
	onClick: () => void;
	children: React.ReactNode;
}

const props: Props = {
	onClick: jest.fn(),
	children: 'Some random text',
};

describe('Button component', () => {
	it('renders a n HTML button', () => {
		render(<Button onClick={props.onClick}>{props.children}</Button>);

		const button = screen.getByText('Some random text');

		expect(button).toBeInTheDocument();
	});
});
