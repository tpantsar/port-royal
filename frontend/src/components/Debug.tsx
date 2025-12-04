import { useAppSelector } from '../hooks/common';

export function Debug() {
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
