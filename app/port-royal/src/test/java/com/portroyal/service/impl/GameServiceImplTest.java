package com.portroyal.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.portroyal.controller.output.ApiResponse;
import com.portroyal.controller.output.GameStatusInfoSimple;
import com.portroyal.model.GameState;
import com.portroyal.model.GameStatus;
import com.portroyal.model.Player;
import com.portroyal.model.cards.Card;
import com.portroyal.service.GameService;
import com.portroyal.service.GameSetupService;
import com.portroyal.util.CardUtil;
import java.util.List;
import java.util.Objects;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GameServiceImplTest {

  private GameState gameState;
  private GameService gameService;

  @BeforeEach
  void setUp() {
    // Create a mock instance of GameSetupService
    // GameSetupService gameSetupService = Mockito.mock(GameSetupService.class);
    GameSetupService gameSetupService = new GameSetupService();

    // Initialize GameState with the mocked GameSetupService
    gameState = new GameState(gameSetupService);

    // Initialize GameService with the GameState
    gameService = new GameServiceImpl(gameState);

    // Set up any additional configurations or states needed for the tests
    // Mock the methods of gameSetupService to return specific values
    // Cards testCards = UnitTestUtil.initTestCards();

    //Mockito.when(gameSetupService.initCards()).thenReturn(testCards);
    //Mockito.when(gameSetupService.initPlayers(Mockito.any(Cards.class)))
    //    .thenReturn(UnitTestUtil.initTestPlayers());

    // Initialize the game state
    gameState.initGame();
  }

  @AfterEach
  void tearDown() {
  }

  @Test
  void resetGameSuccessfully() {
    // Arrange
    List<Card> primaryPile = gameState.getCards().getPrimaryPile();
    List<Card> tablePile = gameState.getCards().getTablePile();

    CardUtil.moveCardFromListToList(primaryPile, tablePile, 1);
    assertEquals(1, tablePile.size());
    primaryPile.clear();

    // Act
    ApiResponse<String> result = gameService.resetGame();

    primaryPile = gameState.getCards().getPrimaryPile();
    tablePile = gameState.getCards().getTablePile();
    List<Card> researchPile = gameState.getCards().getResearchPile();

    assertEquals(200, result.getStatusCode());
    assertEquals("Game has been reset.", result.getMessage());

    // Assert that each player is dealt 3 cards from the primary pile
    assertEquals(119 - gameState.getPlayers().size() * 3, primaryPile.size());
    assertTrue(tablePile.isEmpty());
    assertTrue(researchPile.isEmpty());
  }

  @Test
  void testGetPlayers() {
    // Act
    List<Player> players = gameService.getPlayers();

    // Assert
    assertNotNull(players);
    assertEquals(2, players.size());
  }

  @Test
  void testGetGameStateSimple() {
    // Act
    ApiResponse<GameStatusInfoSimple> result = gameService.getGameStateSimple();
    GameStatusInfoSimple gameStatus = result.getData();

    // Assert
    assertEquals(200, result.getStatusCode());
    assertEquals("Game state retrieved successfully.", result.getMessage());
    assertNotNull(gameStatus);

    // Check card piles
    assertEquals(119 - gameStatus.getPlayers().size() * 3, gameStatus.getPrimaryPile());
    assertEquals(0, gameStatus.getTablePile());
    assertEquals(0, gameStatus.getDiscardPile());
    assertEquals(0, gameStatus.getResearchPile());

    // Check status and duplicate colored ships
    assertEquals(GameStatus.IN_PROGRESS, gameStatus.getStatus());
    assertFalse(gameStatus.isDuplicateColoredShips());

    // Check current player
    Player currentPlayer = gameStatus.getCurrentPlayer();
    assertEquals("Alice", currentPlayer.getName());
    assertEquals(3, currentPlayer.getCoins());
    assertEquals(0, currentPlayer.getScore());
    assertEquals(3, currentPlayer.getCards().size());
    assertEquals(0, currentPlayer.getAbilities().size());

    // Check players
    List<Player> players = gameStatus.getPlayers();
    assertEquals(2, players.size());
    assertEquals("Alice", players.get(0).getName());
    assertEquals("Bob", players.get(1).getName());
  }

  @Test
  void drawRandomCardSuccessfully() {
    // Arrange
    List<Card> primaryPile = gameState.getCards().getPrimaryPile();
    List<Card> tablePile = gameState.getCards().getTablePile();
    List<Card> researchPile = gameState.getCards().getResearchPile();

    // Act
    ApiResponse<Card> result = gameService.drawRandomCard();
    Card card = result.getData();

    // Assert
    assertEquals(200, result.getStatusCode());
    assertEquals("Card drawn successfully.", result.getMessage());
    assertNotNull(card);

    // Assert that the card is removed from the primary pile
    assertFalse(primaryPile.stream().anyMatch(c -> Objects.equals(c.getId(), card.getId())));
    assertTrue(tablePile.contains(card) || researchPile.contains(card));
    assertTrue(card.isDisplayImage());
  }
}