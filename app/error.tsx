'use client';
import styles from './page.module.scss';

type Props = {
  error: {
    message: string;
  };
  reset: () => void;
};

const Error: React.FC<Props> = ({ error, reset }) => (
  <div className={styles.error}>
    <h3>'An error occured!'</h3>
    <p>{error.message}</p>
    <button onClick={reset}>Retry</button>
  </div>
);

export default Error;
