import { Card, CharacterAbility } from './Card';

export interface Player {
  id: number;
  name: string;
  coins: number;
  score: number;
  cards: Card[];
  abilities: CharacterAbility[];
  color: string;
}
