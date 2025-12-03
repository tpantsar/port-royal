import { useEffect } from 'react';

import './App.css';
import Players from './components/Players';
import ResearchPile from './components/ResearchPile';
import SnackbarGeneric from './components/SnackbarGeneric';
import TablePile from './components/TablePile';
import { useAppDispatch, useAppSelector } from './hooks/common';
import { drawCard, fetchGameState, resetGame, switchPlayerTurn } from './reducers/gameReducer';

function Debug() {
  const gameState = useAppSelector((state) => state.game.game);

  if (!gameState || gameState === undefined) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div>Primary pile: {gameState.cards.primaryPile.length}</div>
      <div>Table pile: {gameState.cards.tablePile.length}</div>
      <div>Discard pile: {gameState.cards.discardPile.length}</div>
      <div>Research pile: {gameState.cards.researchPile.length}</div>
      <div>Duplicate ships: {gameState.duplicateColoredShips.toString()}</div>
      <div style={{ color: 'red' }}>
        Turn: {gameState.currentPlayer.name} (id={gameState.currentPlayer.id})
      </div>
    </>
  );
}

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGameState());
  }, [dispatch]);

  const gameState = useAppSelector((state) => state.game.game);

  const handleDraw = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await dispatch(drawCard());
  };

  const handleReset = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await dispatch(resetGame());
  };

  const handleSwitch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await dispatch(switchPlayerTurn());
  };

  if (!gameState || gameState === undefined) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <ResearchPile gameState={gameState} />
      <Debug />
      <button onClick={handleDraw}>Draw</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleSwitch}>Switch player</button>
      <TablePile />
      <Players gameState={gameState} />
      <SnackbarGeneric />
    </div>
  );
}
