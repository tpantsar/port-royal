package com.portroyal.service.impl;

import static com.portroyal.util.CardUtil.resolveCardType;

import com.portroyal.controller.output.ApiResponse;
import com.portroyal.controller.output.CardType;
import com.portroyal.controller.output.GameStatusInfo;
import com.portroyal.controller.output.GameStatusInfoSimple;
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
  @Override
  public synchronized ApiResponse<GameStatusInfo> getGameStateFull() {
    final GameStatusInfo status = new GameStatusInfo(gameState);
    try {
      return ApiResponse.success(200, "Game state retrieved successfully.", status);
    } catch (Exception e) {
      return ApiResponse.error(404, "Game state not found", "id",
          "Game state not found. Please try again.");
    }
  }

  @Override
  public synchronized ApiResponse<GameStatusInfoSimple> getGameStateSimple() {
    final GameStatusInfoSimple status = new GameStatusInfoSimple(gameState);
    try {
      return ApiResponse.success(200, "Game state retrieved successfully.", status);
    } catch (Exception e) {
      return ApiResponse.error(404, "Game state not found", "id",
          "Game state not found. Please try again.");
    }
  }

  @Override
  public synchronized List<Player> getPlayers() {
    return gameState.getPlayers();
  }

  @Override
  public synchronized ApiResponse<Player> addPlayer(Player player) {
    // Check if player name already exists in the game
    final List<Player> players = gameState.getPlayers();
    boolean playerNameExists = players.stream().anyMatch(p -> p.getName().equals(player.getName()));

    if (playerNameExists) {
      return ApiResponse.error(404, "Player already exists", "playerId",
          String.format("Player with name '%s' already exists in the game.", player.getName()));
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
  public synchronized ApiResponse<Card> drawRandomCard() {
    List<Card> primaryPile = gameState.getCards().getPrimaryPile();
    List<Card> tablePile = gameState.getCards().getTablePile();
    List<Card> discardPile = gameState.getCards().getDiscardPile();
    List<Card> researchPile = gameState.getCards().getResearchPile();

    try {
      final Card randomCard = RandomUtil.popRandomElementFromList(primaryPile, discardPile);
      if (randomCard != null) {
        if (randomCard.getType().equals(CardType.RESEARCH)) {
          researchPile.add(randomCard);
        } else {
          tablePile.add(randomCard);
        }
        return ApiResponse.success(200, "Card drawn successfully.", resolveCardType(randomCard));
      }
      return ApiResponse.error(404, "No cards available", "id",
          "No cards available in the primary pile.");
    } catch (Exception e) {
      return ApiResponse.error(404, "No cards available", "id",
          "No cards available in the primary pile.");
    }
  }

  // Additional game logic methods
}
