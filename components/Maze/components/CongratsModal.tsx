import React from "react";
import Image from "next/image";

import { Modal } from "@/components/Modal";

type Props = {
  resetGame: () => void;
  moves: number;
};

export const CongratsModal: React.FC<Props> = ({ resetGame, moves }) => {
  return (
    <Modal
      title="Amazing, you won!"
      subtitle={`You solved the maze in ${moves} moves`}
      onClose={resetGame}
      buttonText="Play again"
    >
      <Image src="/icon-party.svg" alt="PARTY ICON" width={250} height={250} />
    </Modal>
  );
};
