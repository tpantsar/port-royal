import { Card } from "./Card";
import { CharacterAbility } from "./CharacterAbility";

export type Player = {
  id: number;
  name: string;
  coins: number;
  score: number;
  cards: Card[];
  abilities: CharacterAbility[];
};
