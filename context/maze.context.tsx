import { useState, createContext } from 'react';

export interface MazeContextInterface {
	maze: number[][];
	moves: number;
	submitGame: () => Promise<Response>;
	setMoves: React.Dispatch<React.SetStateAction<number>>;
}

export const MazeContext = createContext<MazeContextInterface>(
	{} as MazeContextInterface
);

export const MazeProvider = ({ children }: any) => {
	const [moves, setMoves] = useState(0);

	// This could be a GET method from mocky too
	const maze = [
		[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
		[0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0],
		[0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	];

	const submitGame = () => {
		return fetch(
			'https://run.mocky.io/v3/18a6e977-90a1-4f7a-a3bb-9539bbcc79af',
			{
				method: 'POST',
				body: JSON.stringify({
					moves,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		);
	};

	const values = {
		maze,
		moves,
		submitGame,
		setMoves,
	};

	return <MazeContext.Provider value={values}>{children}</MazeContext.Provider>;
};
