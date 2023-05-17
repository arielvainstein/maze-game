/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loading } from '@/components';

jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: any) => {
		return <img {...props} />;
	},
}));

describe('Loading component', () => {
	it('renders a Loading spinner', () => {
		render(<Loading />);

		const spinner = screen.getByRole('img', {
			name: /loading icon/i,
		});

		expect(spinner).toBeInTheDocument();
	});
});
