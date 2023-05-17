import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from '@/components';

interface PropTypes {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  onClose: () => void;
  buttonText: string;
}

const props: PropTypes = {
  children: 'Some random text',
  title: 'Some random title',
  subtitle: 'Some random subtitle',
  onClose: () => jest.fn(),
  buttonText: 'Confirm',
};

describe('Modal component', () => {
  beforeEach(() => {
    render(<Modal {...props} />)
  });

  it('renders a Modal prompt', () => {
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
  });
});
