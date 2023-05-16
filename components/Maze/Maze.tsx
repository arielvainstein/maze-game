"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";

import { Modal } from "@/components/Modal";
import _isEqual from "lodash.isequal";
import classNames from "classnames";
import styles from "./Maze.module.scss";

enum GameStatusEnum {
  PLAYING = "playing",
  FINISHED = "finished",
}

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

const getMazeStartAndFinishPoints = () => {
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

export const Maze: React.FC = () => {
  const mazeExits = useMemo(() => getMazeStartAndFinishPoints(), [maze]);
  const [currentPosition, setCurrentPosition] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatusEnum>(
    GameStatusEnum.PLAYING
  );

  useEffect(() => {
    if (mazeExits?.length === 2) {
      setCurrentPosition(mazeExits[0]);
    }
  }, []);

  useEffect(() => {
    const iWon = _isEqual(currentPosition, mazeExits[1]);
    if (iWon) {
      setGameStatus(GameStatusEnum.FINISHED);
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

    if (key === "ArrowUp" && !!maze[i - 1] && maze[i - 1][j] === 1) {
      setCurrentPosition([i - 1, j]);
      setMoves((moves) => (moves += 1));
    }
    if (key === "ArrowRight" && maze[i][j + 1] === 1) {
      setCurrentPosition([i, j + 1]);
      setMoves((moves) => (moves += 1));
    }
    if (key === "ArrowDown" && !!maze[i + 1] && maze[i + 1][j] === 1) {
      setCurrentPosition([i + 1, j]);
      setMoves((moves) => (moves += 1));
    }
    if (key === "ArrowLeft" && maze[i][j - 1] === 1) {
      setCurrentPosition([i, j - 1]);
      setMoves((moves) => (moves += 1));
    }
  };

  return (
    <>
      <div>
        <h1>Maze game</h1>
        <p>
          Use your keyboard arrows to navigate through the maze and get to the
          exit.
        </p>
        <div className={styles.moves}>
          <span>Moves: {moves}</span>
        </div>
        <table
          onKeyDown={handleMove}
          autoFocus
          tabIndex={0}
          className={styles.maze}
        >
          <tbody>
            {maze.map((row, i) => (
              <tr key={`row-${i}`}>
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
      {gameStatus === GameStatusEnum.FINISHED && (
        <Modal
          title="Amazing, you won!"
          subtitle={`You solved the maze in ${moves} moves`}
          onClick={resetGame}
          onClose={resetGame}
        >
          <Image
            src="/icon-party.svg"
            alt="PARTY ICON"
            width={250}
            height={250}
          />
        </Modal>
      )}
    </>
  );
};
