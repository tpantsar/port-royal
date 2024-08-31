package com.portroyal.service.impl;

import com.portroyal.controller.output.ApiResponse;
import com.portroyal.model.GameState;
import com.portroyal.model.Player;
import com.portroyal.model.cards.Card;
import com.portroyal.service.GameService;
import com.portroyal.util.RandomUtil;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class GameServiceImpl implements GameService {

  private final GameState gameState;

  public GameServiceImpl(final GameState gameState) {
    this.gameState = gameState;
  }

  // Synchronized methods to handle game logic safely
  public synchronized GameState getGameState() {
    return gameState;
  }

  @Override
  public synchronized List<Player> getPlayers() {
    return gameState.getPlayers();
  }

  @Override
  public synchronized ApiResponse<Player> addPlayer(Player player) {
    final List<Player> players = gameState.getPlayers();
    if (players.contains(player)) {
      return ApiResponse.error(404, "Player already exists", "playerId",
          "Player already exists in the game.");
    }
    players.add(player);
    return ApiResponse.success(200, "Player added successfully.", player);
  }

  @Override
  public synchronized void buyCharacterCard(String playerId, String cardId) {
    // ApiResponse<String>

    // Implement logic to buy a character card
    // return null;
  }

  @Override
  public synchronized ApiResponse<Card> drawRandomCard(final String playerId) {
    List<Card> primaryPile = gameState.getCards().getPrimaryPile();
    List<Card> discardPile = gameState.getCards().getDiscardPile();

    try {
      final Card randomCard = RandomUtil.popRandomElementFromList(primaryPile, discardPile);
      return ApiResponse.success(200, "Card drawn successfully.", new Card(randomCard));
    } catch (Exception e) {
      return ApiResponse.error(404, "No cards available", "id",
          "No cards available in the primary pile.");
    }
  }

  // Additional game logic methods
}
