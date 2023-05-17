'use client';
import { Maze } from '@/components';

import { QueryClient, QueryClientProvider } from 'react-query';
import { MazeProvider } from '@/context';
import styles from './page.module.scss';

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MazeProvider>
        <main className={styles.main}>
          <h1>Maze game</h1>
          <p>
            Use your keyboard arrows to navigate through the maze and get to the
            exit.
          </p>
          <Maze />
        </main>
      </MazeProvider>
    </QueryClientProvider>
  );
}
