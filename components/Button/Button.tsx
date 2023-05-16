import React from "react";

import styles from "./Button.module.scss";

type Props = {
  onClick: () => void;
  text: string;
};

export const Button: React.FC<Props> = ({ onClick, text }, props) => {
  return (
    <button type="button" className={styles.button} onClick={onClick} {...props}>
      {text}
    </button>
  );
};
