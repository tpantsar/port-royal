package com.portroyal.controller;

import com.portroyal.controller.output.ApiResponse;
import com.portroyal.controller.output.GameStatusInfo;
import com.portroyal.controller.output.GameStatusInfoSimple;
import com.portroyal.model.Player;
import com.portroyal.model.cards.Card;
import com.portroyal.service.GameService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/game")
public class GameController {

  @Autowired
  private GameService gameService;

  @GetMapping("/state-full")
  public ApiResponse<GameStatusInfo> getGameStateFull() {
    return gameService.getGameStateFull();
  }

  @GetMapping("/state-simple")
  public ApiResponse<GameStatusInfoSimple> getGameStateSimple() {
    return gameService.getGameStateSimple();
  }

  // Endpoint to get list of players
  @GetMapping("/players")
  public List<Player> getPlayers() {
    return gameService.getPlayers();
  }

  // Endpoint to add a new player
  @PostMapping("/players")
  public ApiResponse<Player> addPlayer(@RequestBody Player player) {
    return gameService.addPlayer(player);
  }

  // Endpoint to draw a random card
  @PostMapping("/draw-card")
  public ApiResponse<Card> drawCard() {
    return gameService.drawRandomCard();
  }

  // Endpoint to buy a character card
  @PostMapping("/buy")
  public void buyCharacterCard(@RequestParam String playerId, @RequestParam String cardId) {
    gameService.buyCharacterCard(playerId, cardId);
  }
}
