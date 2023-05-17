import React from 'react';

import styles from './Button.module.scss';

type Props = {
	onClick: () => void;
	children: React.ReactNode;
	className?: string;
};

export const Button: React.FC<Props> = (props) => {
	return <button type='button' className={styles.button} {...props} />;
};
