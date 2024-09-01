package com.portroyal.controller.output;

import com.portroyal.model.GameState;
import com.portroyal.model.GameStatus;
import com.portroyal.model.Player;
import java.util.List;

public class GameStatusInfoSimple {

  private int primaryPile;
  private int tablePile;
  private int discardPile;
  private int researchPile;
  private GameStatus status;
  private boolean duplicateColoredShips;
  private Player currentPlayer; // The current player in turn
  private List<Player> players;

  public GameStatusInfoSimple(final GameState gameState) {
    this.primaryPile = gameState.getCards().getPrimaryPile().size();
    this.tablePile = gameState.getCards().getTablePile().size();
    this.discardPile = gameState.getCards().getDiscardPile().size();
    this.researchPile = gameState.getCards().getResearchPile().size();
    this.status = gameState.getStatus();
    this.duplicateColoredShips = gameState.isDuplicateColoredShips();
    this.currentPlayer = gameState.getCurrentPlayer();
    this.players = gameState.getPlayers();
  }

  public int getPrimaryPile() {
    return primaryPile;
  }

  public void setPrimaryPile(int primaryPile) {
    this.primaryPile = primaryPile;
  }

  public int getTablePile() {
    return tablePile;
  }

  public void setTablePile(int tablePile) {
    this.tablePile = tablePile;
  }

  public int getDiscardPile() {
    return discardPile;
  }

  public void setDiscardPile(int discardPile) {
    this.discardPile = discardPile;
  }

  public int getResearchPile() {
    return researchPile;
  }

  public void setResearchPile(int researchPile) {
    this.researchPile = researchPile;
  }

  public List<Player> getPlayers() {
    return players;
  }

  public void setPlayers(List<Player> players) {
    this.players = players;
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
