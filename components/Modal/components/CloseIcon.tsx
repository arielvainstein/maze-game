import React from 'react';

import styles from './CloseIcon.styles.module.scss';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export const CloseIcon: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};
