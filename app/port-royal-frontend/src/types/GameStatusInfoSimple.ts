import { GameStatus } from "./GameStatus";
import { Player } from "./Player";

export type GameStatusInfoSimple = {
  primaryPile: number;
  tablePile: number;
  discardPile: number;
  researchPile: number;
  status: GameStatus;
  duplicateColoredShips: boolean;
  currentPlayer: Player;
  players: Player[];
};
