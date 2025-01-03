package com.portroyal.service;

import com.portroyal.controller.dto.BuyCardRequest;
import com.portroyal.controller.output.ApiResponse;
import com.portroyal.controller.output.GameStatusInfo;
import com.portroyal.controller.output.GameStatusInfoSimple;
import com.portroyal.model.Player;
import com.portroyal.model.cards.Card;
import java.util.List;

public interface GameService {

  /**
   * Current player draws a random card from the primary deck. The card is then moved to the table
   * pile or research pile.
   *
   * @return The card information that is drawn from the primary deck.
   */
  ApiResponse<Card> drawRandomCard();

  ApiResponse<GameStatusInfo> getGameStateFull();

  ApiResponse<GameStatusInfoSimple> getGameStateSimple();

  List<Player> getPlayers();

  ApiResponse<Player> addPlayer(Player player);

  /**
   * Buy a character card or ship card from the table pile. The character card is then moved to the
   * player's cards list. The ship card is moved to the discard pile and the player's coins are
   * updated.
   *
   * @param request The request object containing the player id and card id.
   * @return The card information that is bought from the table pile.
   */
  ApiResponse<Card> buyCard(BuyCardRequest request);

  /**
   * Reset the game state to the initial state.
   *
   * @return A message indicating the game has been reset.
   */
  ApiResponse<String> resetGame();
}
