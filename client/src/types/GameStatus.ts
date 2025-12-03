import { Card } from './Card';
import { Player } from './Player';

export interface Cards {
  primaryPile: Card[];
  tablePile: Card[];
  discardPile: Card[];
  researchPile: Card[];
}

type GameStatusEnum = 'in_progress' | 'finished';

export type GameStatus = {
  players: Player[];
  cards: Cards;
  currentPlayer: Player;
  duplicateColoredShips: boolean;
  status: GameStatusEnum;
};
