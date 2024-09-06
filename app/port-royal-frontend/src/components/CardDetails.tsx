import React from "react";
import { Card } from "../types/Card";

type CardDetailsProps = {
  drawCard: () => void;
  card: Card | null;
  message: string;
};

const CardDetails: React.FC<CardDetailsProps> = ({
  drawCard,
  card,
  message,
}) => {
  return (
    <div>
      <button onClick={drawCard}>draw-card</button>
      {message && (
        <div>
          <p>{message}</p>
        </div>
      )}
      {card && (
        <div>
          <p>id: {card.id}</p>
          <p>name: {card.name}</p>
          <p>type: {card.type}</p>
          <p>displayImage: {card.displayImage.toString()}</p>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
