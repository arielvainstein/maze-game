const getMazeStartAndFinishPoints = (maze: number[][]) => {
	let indexes: number[][] = [];

	const topEscapeIndex = maze[0].findIndex((el) => el === 1);
	const bottomEscapeIndex = maze[maze.length - 1].findIndex((el) => el === 1);
	const leftEscapeIndex = maze.findIndex((row) => row[0] === 1);
	const rightEscapeIndex = maze.findIndex((row) => row[row.length - 1] === 1);

	if (topEscapeIndex && topEscapeIndex !== -1) {
		indexes.push([0, topEscapeIndex]);
	}
	if (bottomEscapeIndex && bottomEscapeIndex !== -1) {
		indexes.push([maze.length - 1, bottomEscapeIndex]);
	}
	if (leftEscapeIndex && leftEscapeIndex !== -1) {
		indexes.push([leftEscapeIndex, 0]);
	}
	if (rightEscapeIndex && rightEscapeIndex !== -1) {
		indexes.push([rightEscapeIndex, 11]);
	}

	return indexes;
};

export default getMazeStartAndFinishPoints;
