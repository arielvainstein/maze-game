"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/Button";

import styles from "./Modal.module.scss";

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  onClose: () => void;
  onClick: () => void;
};

export const Modal: React.FC<Props> = ({
  children,
  title,
  subtitle,
  onClose,
  onClick,
}) => {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    });

    return () =>
      window.removeEventListener("keydown", () =>
        console.log("unmounted component")
      );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerModal}>
        <div className={styles.containerModalCross}>
          <Image
            id="closeIcon"
            src="/icon-close.svg"
            alt="CLOSE ICON"
            width={40}
            height={40}
          />
        </div>
        <div className={styles.containerModalHeading}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className={styles.containerModalContent}>{children}</div>
        <div className={styles.containerModalActions}>
          <Button onClick={onClick} text='Play again' />
        </div>
      </div>
    </div>
  );
};
