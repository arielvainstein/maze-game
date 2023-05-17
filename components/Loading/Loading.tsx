import React from 'react';

import Image from 'next/image';

import styles from './Loading.module.scss';

export const Loading: React.FC = () => {
	return (
		<div className={styles.container}>
			<Image
				src='/icon-loading.svg'
				alt='LOADING ICON'
				width={100}
				height={100}
			/>
		</div>
	);
};
