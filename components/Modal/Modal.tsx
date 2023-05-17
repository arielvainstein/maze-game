import React, { useEffect } from 'react';

import Image from 'next/image';
import { Button } from '@/components/Button';
import { CloseIcon } from './components/CloseIcon';

import styles from './Modal.module.scss';

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onClose: () => void;
  buttonText: string;
};

export const Modal: React.FC<Props> = ({
  children,
  title,
  subtitle,
  onClose,
  buttonText,
}) => {
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        onClose();
      }
    });

    return () =>
      window.removeEventListener('keydown', () =>
        // eslint-disable-next-line no-console
        console.log('unmounted component')
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-testid="modal" className={styles.container}>
      <div className={styles.containerModal}>
        <div className={styles.containerModalClose}>
          <CloseIcon onClick={onClose}>
            <Image
              id="closeIcon"
              src="/icon-close.svg"
              alt="CLOSE ICON"
              width={40}
              height={40}
            />
          </CloseIcon>
        </div>
        <div className={styles.containerModalHeading}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className={styles.containerModalContent}>{children}</div>
        <div className={styles.containerModalActions}>
          <Button onClick={onClose}>{buttonText}</Button>
        </div>
      </div>
    </div>
  );
};
