package com.portroyal.controller.output;

import com.portroyal.model.GameState;
import com.portroyal.model.GameStatus;
import com.portroyal.model.Player;
import com.portroyal.model.cards.Cards;
import java.util.List;

public class GameStatusInfo {

  private List<Player> players;
  private Cards cards;
  private Player currentPlayer; // The current player in turn
  private boolean duplicateColoredShips;
  private GameStatus status;

  public GameStatusInfo(final GameState gameState) {
    this.players = gameState.getPlayers();
    this.cards = gameState.getCards();
    this.currentPlayer = gameState.getCurrentPlayer();
    this.duplicateColoredShips = gameState.isDuplicateColoredShips();
    this.status = gameState.getStatus();
  }

  public List<Player> getPlayers() {
    return players;
  }

  public void setPlayers(List<Player> players) {
    this.players = players;
  }

  public Cards getCards() {
    return cards;
  }

  public void setCards(Cards cards) {
    this.cards = cards;
  }

  public Player getCurrentPlayer() {
    return currentPlayer;
  }

  public void setCurrentPlayer(Player currentPlayer) {
    this.currentPlayer = currentPlayer;
  }

  public boolean isDuplicateColoredShips() {
    return duplicateColoredShips;
  }

  public void setDuplicateColoredShips(boolean duplicateColoredShips) {
    this.duplicateColoredShips = duplicateColoredShips;
  }

  public GameStatus getStatus() {
    return status;
  }

  public void setStatus(GameStatus status) {
    this.status = status;
  }
}
