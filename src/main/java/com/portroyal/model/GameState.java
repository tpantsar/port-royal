package com.portroyal.model;

import com.portroyal.model.cards.Cards;
import com.portroyal.service.GameSetupService;
import jakarta.annotation.PostConstruct;
import java.util.List;

/* Class to handle the game logic and state. */
public class GameState {

  private List<Player> players;
  private Cards cards;
  private Player currentPlayer; // The current player in turn
  private boolean duplicateColoredShips;
  private GameStatus status;

  public GameState(final GameSetupService gameSetupService) {
    initGame(gameSetupService);
  }

  // Initialize the game state using the GameSetupService
  @PostConstruct
  private void initGame(final GameSetupService gameSetupService) {
    this.players = gameSetupService.getPlayers();
    this.cards = gameSetupService.getCards();
    this.currentPlayer = gameSetupService.getCurrentPlayer();
    this.duplicateColoredShips = gameSetupService.isDuplicateColoredShips();
    this.status = gameSetupService.getStatus();
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
