"use client";
import React, { useState, useMemo, useEffect } from "react";

import _isEqual from "lodash.isequal";
import classNames from "classnames";
import styles from "./Maze.module.scss";

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

const getMazeExits = () => {
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
  const [currentPosition, setCurrentPosition] = useState<number[]>([]);
  const mazeExits = useMemo(() => getMazeExits(), [maze]);

  useEffect(() => {
    if (mazeExits?.length === 2) {
      setCurrentPosition(mazeExits[0]);
    }
  }, []);

  const handleMove = (e: any) => {
    e.preventDefault();
    const key = e.code;
    
    const [i, j] = currentPosition;
    if (key === "ArrowUp" && maze[i - 1][j] === 1) {
      setCurrentPosition([i - 1, j]);
    }
    if (key === "ArrowRight" && maze[i][j + 1] === 1) {
      setCurrentPosition([i, j + 1]);
    }
    if (key === "ArrowDown" && maze[i + 1][j] === 1) {
      setCurrentPosition([i + 1, j]);
    }
    if (key === "ArrowLeft" && maze[i][j - 1] === 1) {
      setCurrentPosition([i, j - 1]);
    }
  };

  return (
    <div className="App" onKeyDown={handleMove} tabIndex={-1}>
      <table id="maze">
        <tbody>
          {maze.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((cell, j) => (
                <td
                  key={`cell-${i}-${j}`}
                  className={classNames(styles[`status${cell}`], {
                    [styles.startStep]: _isEqual([i, j], mazeExits[0]),
                    [styles.endStep]: _isEqual([i, j], mazeExits[1]),
                  })}
                >
                  <div
                    className={
                      _isEqual([i, j], currentPosition)
                        ? styles.currentStep
                        : ""
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
