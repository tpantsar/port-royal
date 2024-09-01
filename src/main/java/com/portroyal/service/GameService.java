package com.portroyal.service;

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

  void buyCharacterCard(String playerId, String cardId);
}
