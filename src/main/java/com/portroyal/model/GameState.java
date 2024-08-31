package com.portroyal.model;

import com.portroyal.model.cards.Cards;
import com.portroyal.service.GameSetupService;
import jakarta.annotation.PostConstruct;
import java.util.List;

/* Class to handle the game logic and state. */
public class GameState {

  private GameSetupService gameSetupService;

  private List<Player> players;
  private Cards cards;
  private Player currentPlayer; // The current player in turn
  private boolean duplicateColoredShips;
  private GameStatus status;

  public GameState(GameSetupService gameSetupService) {
    this.gameSetupService = gameSetupService;
  }

  // Initialize the game state using the GameSetupService
  @PostConstruct
  private void initGame() {
    this.players = gameSetupService.initPlayers();
    this.cards = gameSetupService.initCards();
    this.currentPlayer = players.getFirst();
    this.duplicateColoredShips = false;
    this.status = GameStatus.IN_PROGRESS;
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

  public GameSetupService getGameSetupService() {
    return gameSetupService;
  }

  public void setGameSetupService(GameSetupService gameSetupService) {
    this.gameSetupService = gameSetupService;
  }
}
