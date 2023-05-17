/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CongratsModal } from '../CongratsModal';

jest.mock('next/image', () => ({
	__esModule: true,
	default: (props: any) => {
		// eslint-disable-next-line jsx-a11y/alt-text
		return <img {...props} />;
	},
}));

const props = {
	resetGame: jest.fn(),
	asd: jest.fn(),
	moves: 4,
};

describe('Congrats Modal', () => {
	it('renders a Modal with congrats message and amount os moves', () => {
		render(<CongratsModal {...props} />);

		const successMessage = screen.getByText('Amazing, you won!');
		const subtitleMessage = screen.getByText('You solved the maze in 4 moves');

		expect(successMessage).toBeInTheDocument();
		expect(subtitleMessage).toBeInTheDocument();
	});

	it('should display the congrats image', () => {
		render(<CongratsModal {...props} />);

		const modalSuccessImage = screen.getByRole('img', {
			name: /party icon/i,
		});

		expect(modalSuccessImage).toBeInTheDocument();
	});

	it('should call resetGame method after "play again" button is pressed', () => {
		render(<CongratsModal {...props} />);

		const restartButton = screen.getByRole('button', {
			name: /play again/i,
		});

		fireEvent.click(restartButton);
		expect(props.resetGame).toHaveBeenCalled();
	});
});
