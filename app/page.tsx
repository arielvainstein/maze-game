import { Maze } from '@/components/Maze'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <Maze />
    </main>
  )
}
