/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect, useRef, useContext } from 'react';
import { MazeContext } from '@/context';
import { useMutation } from 'react-query';

import { Loading } from '@/components';
import { CongratsModal } from './components';
import { getMazeStartAndFinishPoints } from './utils';
import _isEqual from 'lodash.isequal';
import classNames from 'classnames';
import styles from './Maze.module.scss';

enum GameStatusEnum {
  PLAYING = 'playing',
  FINISHED = 'finished',
}

export const Maze: React.FC = () => {
  const url = 'winner.mp3';
  const mazeContext = useContext(MazeContext);
  const { maze, moves, submitGame, setMoves } = mazeContext;

  const { mutate: submitGameMutate, isLoading } = useMutation(submitGame, {
    onSuccess: () => {
      setGameStatus(GameStatusEnum.FINISHED);
      audioRef?.current?.play();
    },
    // TODO: Create error snackbar
    // eslint-disable-next-line no-console
    onError: () => console.log('Something failed, try again.'),
  });

  const tableRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio(url) : undefined
  );

  const mazeExits = useMemo(() => getMazeStartAndFinishPoints(maze), [maze]);
  const [currentPosition, setCurrentPosition] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatusEnum>(
    GameStatusEnum.PLAYING
  );

  useEffect(() => {
    if (mazeExits?.length === 2) {
      setCurrentPosition(mazeExits[0]);
    }
    tableRef.current.focus();
  }, []);

  useEffect(() => {
    const iWon = _isEqual(currentPosition, mazeExits[1]);
    if (iWon) {
      submitGameMutate();
    }
  }, [currentPosition]);

  const resetGame = () => {
    setGameStatus(GameStatusEnum.PLAYING);
    setCurrentPosition(mazeExits[0]);
    setMoves(0);
  };

  const handleMove = (e: any) => {
    e.preventDefault();
    const key = e.code;

    if (gameStatus === GameStatusEnum.FINISHED) return;

    const [i, j] = currentPosition;

    if (key === 'ArrowUp' && !!maze[i - 1] && maze[i - 1][j] === 1) {
      setCurrentPosition([i - 1, j]);
      setMoves((moves) => (moves += 1));
    }
    if (key === 'ArrowRight' && maze[i][j + 1] === 1) {
      setCurrentPosition([i, j + 1]);
      setMoves((moves) => (moves += 1));
    }
    if (key === 'ArrowDown' && !!maze[i + 1] && maze[i + 1][j] === 1) {
      setCurrentPosition([i + 1, j]);
      setMoves((moves) => (moves += 1));
    }
    if (key === 'ArrowLeft' && maze[i][j - 1] === 1) {
      setCurrentPosition([i, j - 1]);
      setMoves((moves) => (moves += 1));
    }
  };

  return (
    <>
      <div>
        <div className={styles.moves}>
          <span>Moves: {moves}</span>
        </div>
        <table
          data-testid="maze"
          ref={tableRef}
          onKeyDown={handleMove}
          tabIndex={0}
          className={styles.maze}
        >
          <tbody>
            {maze.map((row, i) => (
              <tr key={`row-${i}`} data-testid="mazeRow">
                {row.map((cell, j) => (
                  <td
                    key={`cell-${i}-${j}`}
                    className={styles[`status${cell}`]}
                  >
                    <div
                      className={classNames({
                        [styles.currentStep]: _isEqual([i, j], currentPosition),
                        [styles.finishLine]: _isEqual([i, j], mazeExits[1]),
                      })}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && <Loading />}
      {gameStatus === GameStatusEnum.FINISHED && (
        <CongratsModal resetGame={resetGame} moves={moves} />
      )}
    </>
  );
};
