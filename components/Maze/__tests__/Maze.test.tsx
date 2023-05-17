import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { MazeProvider } from '@/context';
import { Maze } from '@/components';

jest.mock('react-query', () => ({
  useMutation: jest
    .fn()
    .mockReturnValue({ mutate: jest.fn(), isLoading: false }),
}));

describe('Maze component', () => {
  beforeEach(() => {
    render(
      <MazeProvider>
        <Maze />
      </MazeProvider>
    );
  });

  it('renders a Maze game', () => {
    const mazeGame = screen.getByTestId('maze');
    const mazeRow = screen.getAllByTestId('mazeRow');
    
    expect(mazeGame).toBeInTheDocument();
    expect(mazeRow).toHaveLength(12);
  });
  
  it('should complete maze successfully and get 32 moves on the moves counter', async () => {
    const user = userEvent.setup();

    await user.keyboard('[ArrowDown]');
    await user.keyboard('[ArrowDown]');
    
    await user.keyboard('[ArrowRight]');
    await user.keyboard('[ArrowRight]');
    
    await user.keyboard('[ArrowUp]');
    
    await user.keyboard('[ArrowRight]');
    await user.keyboard('[ArrowRight]');
    
    await user.keyboard('[ArrowDown]');
    await user.keyboard('[ArrowDown]');
    await user.keyboard('[ArrowDown]');
    
    await user.keyboard('[ArrowLeft]');
    await user.keyboard('[ArrowLeft]');
    await user.keyboard('[ArrowLeft]');
    await user.keyboard('[ArrowLeft]');
    
    await user.keyboard('[ArrowDown]');
    await user.keyboard('[ArrowDown]');
    
    await user.keyboard('[ArrowRight]');
    await user.keyboard('[ArrowRight]');
    await user.keyboard('[ArrowRight]');
    await user.keyboard('[ArrowRight]');
    
    await user.keyboard('[ArrowDown]');
    await user.keyboard('[ArrowDown]');
    await user.keyboard('[ArrowDown]');
    await user.keyboard('[ArrowDown]');
    
    await user.keyboard('[ArrowRight]');
    await user.keyboard('[ArrowRight]');
    
    await user.keyboard('[ArrowUp]');
    
    await user.keyboard('[ArrowRight]');
    await user.keyboard('[ArrowRight]');
    
    await user.keyboard('[ArrowDown]');
    
    await user.keyboard('[ArrowRight]');
    await user.keyboard('[ArrowRight]');

    expect(screen.getByText('Moves: 32')).toBeInTheDocument();
  });
});
