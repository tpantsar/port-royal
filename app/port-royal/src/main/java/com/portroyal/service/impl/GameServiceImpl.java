package com.portroyal.service.impl;

import static com.portroyal.util.CardUtil.resolveCardType;

import com.portroyal.controller.dto.BuyCardRequest;
import com.portroyal.controller.output.ApiResponse;
import com.portroyal.controller.output.CardType;
import com.portroyal.controller.output.GameStatusInfo;
import com.portroyal.controller.output.GameStatusInfoSimple;
import com.portroyal.model.GameState;
import com.portroyal.model.Player;
import com.portroyal.model.cards.Card;
import com.portroyal.model.cards.character.CharacterCard;
import com.portroyal.service.GameService;
import com.portroyal.util.CardUtil;
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
      return ApiResponse.error(404, "Game state not found", "game",
          "Game state not found. Please try again.");
    }
  }

  @Override
  public synchronized ApiResponse<GameStatusInfoSimple> getGameStateSimple() {
    final GameStatusInfoSimple status = new GameStatusInfoSimple(gameState);
    try {
      return ApiResponse.success(200, "Game state retrieved successfully.", status);
    } catch (Exception e) {
      return ApiResponse.error(404, "Game state not found", "game",
          "Game state not found. Please try again.");
    }
  }

  @Override
  public synchronized List<Player> getPlayers() {
    return gameState.getPlayers();
  }

  @Override
  public synchronized ApiResponse<Player> addPlayer(Player player) {
    if (player == null) {
      return ApiResponse.error(400, "Player not found.", "player",
          "Player object is null. Please provide a valid player object.");
    }
    if (player.getId() < 1) {
      return ApiResponse.error(400, "Invalid player id.", "id",
          "Player id must be greater than 0.");
    }
    if (player.getName() == null || player.getName().isEmpty() || player.getName().isBlank()) {
      return ApiResponse.error(400, "Invalid player name.", "name",
          "Player name must not be empty.");
    }

    // Check if player name or id already exists in the game
    final List<Player> players = gameState.getPlayers();
    boolean playerNameExists = players.stream().anyMatch(p -> p.getName().equals(player.getName()));
    boolean playerIdExists = players.stream().anyMatch(p -> p.getId() == player.getId());

    if (playerNameExists) {
      return ApiResponse.error(400, "Player name already exists.", "playerName",
          String.format("Player with name '%s' already exists in the game.", player.getName()));
    }
    if (playerIdExists) {
      return ApiResponse.error(400, "Player id already exists.", "playerId",
          String.format("Player with id '%s' already exists in the game.", player.getId()));
    }
    players.add(player);
    return ApiResponse.success(200, "Player added successfully.", player);
  }

  @Override
  public synchronized ApiResponse<Card> buyCharacterCard(BuyCardRequest request) {
    final int playerId = request.getPlayerId();
    final int cardId = request.getCardId();

    // Find the card in the table pile
    List<Card> tablePile = gameState.getCards().getTablePile();
    Card card = CardUtil.getCardFromListById(tablePile, cardId);

    if (card == null) {
      return ApiResponse.error(404, "Card not found", "id", "Card not found in the table pile.");
    }
    // Check if the card is a character card
    if (!card.getType().equals(CardType.CHARACTER)) {
      return ApiResponse.error(400, "Invalid card type", "type",
          "Card type is not a character card.");
    }

    // Find the player in the game
    Player player = gameState.getPlayers().stream().filter(p -> p.getId() == playerId).findFirst()
        .orElse(null);

    if (player == null) {
      return ApiResponse.error(404, "Player not found", "id", "Player not found in the game.");
    }

    // Check if it is the player's turn
    Player currentPlayer = gameState.getCurrentPlayer();
    if (!currentPlayer.equals(player)) {
      return ApiResponse.error(400, "Invalid player", "id",
          String.format("%s tried to buy a card. It is %s's turn at the moment.", player.getName(),
              currentPlayer.getName()));
    }

    // Check if player has enough coins to buy the card
    if (player.getCoins() < ((CharacterCard) card).getCharacterCost()) {
      return ApiResponse.error(400, "Insufficient coins", "coins",
          "Player does not have enough coins to buy the card.");
    }

    // Update player's coins and add the card to the player's cards
    player.setCoins(player.getCoins() - ((CharacterCard) card).getCharacterCost());
    player.getCards().add(card);

    // Remove the card from the table pile
    tablePile.remove(card);

    return ApiResponse.success(200, "Card bought successfully.", resolveCardType(card));
  }

  @Override
  public ApiResponse<String> resetGame() {
    return gameState.resetGame();
  }

  @Override
  public synchronized ApiResponse<Card> drawRandomCard() {
    List<Card> primaryPile = gameState.getCards().getPrimaryPile();
    List<Card> tablePile = gameState.getCards().getTablePile();
    List<Card> discardPile = gameState.getCards().getDiscardPile();
    List<Card> researchPile = gameState.getCards().getResearchPile();

    try {
      final Card randomCard = RandomUtil.getRandomCardFromPrimaryPile(primaryPile, discardPile);
      if (randomCard != null) {
        randomCard.setDisplayImage(true);
        if (randomCard.getType().equals(CardType.RESEARCH)) {
          researchPile.add(randomCard);
        } else {
          tablePile.add(randomCard);

          // Check if the table has duplicate colored ships
          gameState.setDuplicateColoredShips(CardUtil.hasDuplicateColoredShips(tablePile));

          if (gameState.isDuplicateColoredShips()) {
            CardUtil.moveAllCardsFromListToList(tablePile,
                discardPile); // Move all table cards to discard pile
            gameState.changeCurrentPlayer(); // Set the next player in turn

            return ApiResponse.error(400, "Duplicate colored ships.", "table",
                "The table pile contains two ships with the same name. Moving cards to discard pile.",
                resolveCardType(randomCard));
          }
        }
        try {
          return ApiResponse.success(200, "Card drawn successfully.", resolveCardType(randomCard));
        } catch (Exception e) {
          return ApiResponse.error(400, "Resolve error", "card",
              "Found card type could not be constructed. Card may not have necessary fields, e.g. ShipCard and CharacterCard fields.");
        }
      }
      return ApiResponse.error(400, "No cards available.", "cards",
          "No cards available in the primary pile.");
    } catch (Exception e) {
      return ApiResponse.error(400, "No cards available.", "cards",
          "No cards available in the primary pile.");
    }
  }

  // Additional game logic methods

  private void checkGameState() {
    List<Card> tablePile = gameState.getCards().getTablePile();
    List<Card> discardPile = gameState.getCards().getDiscardPile();

    // TODO: Check if the game is over
    // if (condition) {
    //   gameState.setStatus(GameStatus.FINISHED);
    // }

    // Check if the table has duplicate colored ships
    gameState.setDuplicateColoredShips(CardUtil.hasDuplicateColoredShips(tablePile));

    if (gameState.isDuplicateColoredShips()) {
      CardUtil.moveAllCardsFromListToList(tablePile,
          discardPile); // Move all table cards to discard pile
      gameState.changeCurrentPlayer(); // Set the next player in turn
    }
  }
}
