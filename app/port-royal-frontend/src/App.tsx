// src/App.tsx
import { useState } from "react";
import "./App.css";
import gameService from "./services/game";
import { ApiResponse } from "./types/ApiResponse";
import { Card } from "./types/Card";
import { GameStatusInfoSimple } from "./types/GameStatusInfoSimple";
import CardImage from "./components/CardImage";

function App() {
  const [gameState, setGameState] = useState<GameStatusInfoSimple | null>(null);
  const [card, setCard] = useState<Card | null>(null);

  const getGameState = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response: ApiResponse<GameStatusInfoSimple> =
        await gameService.getGameState();
      setGameState(response.data);
    } catch (error) {
      console.error("Failed to fetch game state", error);
    }
  };

  const fetchApi = async (event: React.MouseEvent<HTMLButtonElement>) => {
    drawCard(event);
    getGameState(event);
  };

  const drawCard = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response: ApiResponse<Card> = await gameService.drawCard();
      setCard(response.data);
    } catch (error) {
      console.error("Failed to draw card", error);
    }
  };

  return (
    <div className="row">
      <div>
        <button onClick={fetchApi}>fetch</button>
      </div>
      <div>
        <button onClick={getGameState}>state-simple</button>
        <p>primaryPile: {gameState?.primaryPile}</p>
        <p>tablePile: {gameState?.tablePile}</p>
        <p>discardPile: {gameState?.discardPile}</p>
        <p>researchPile: {gameState?.researchPile}</p>
        <p>status: {gameState?.status}</p>
        <p>
          duplicateColoredShips: {gameState?.duplicateColoredShips.toString()}
        </p>
        <p>currentPlayer: {gameState?.currentPlayer.name}</p>
        <p>
          players: {gameState?.players.map((player) => player.name).join(", ")}
        </p>
      </div>
      <div>
        <button onClick={drawCard}>draw-card</button>
        {card && (
          <div>
            <p>id: {card?.id}</p>
            <p>name: {card?.name}</p>
            <p>type: {card?.type}</p>
            <p>displayImage: {card?.displayImage}</p>
            <p>imageName: {card?.imageName}</p>
            <CardImage imageName={card?.imageName} />

            {/*}
            <p>victoryPoints: {card?.victoryPoints}</p>
            <p>characterCost: {card?.characterCost}</p>
            <p>abilities: {card?.abilities.map((ability) => ability)}</p>
            <p>researchMode: {card?.researchMode}</p>
            <p>coinsAmount: {card?.coinsAmount}</p>
            <p>shipWeapons: {card?.shipWeapons}</p>
            <p>shipCoins: {card?.shipCoins}</p>
            <p>taxMode: {card?.taxMode}</p>
            */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
