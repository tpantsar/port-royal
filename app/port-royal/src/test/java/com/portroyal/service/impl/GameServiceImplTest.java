package com.portroyal.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.portroyal.UnitTestUtil;
import com.portroyal.controller.output.ApiResponse;
import com.portroyal.controller.output.GameStatusInfoSimple;
import com.portroyal.model.GameState;
import com.portroyal.model.GameStatus;
import com.portroyal.model.Player;
import com.portroyal.model.cards.Card;
import com.portroyal.model.cards.Cards;
import com.portroyal.service.GameService;
import com.portroyal.service.GameSetupService;
import com.portroyal.util.CardUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Value;

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
  void testResetGame_success() {
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
  void testAddPlayer_success() {
    // Arrange
    Cards cards = UnitTestUtil.initTestCards();
    List<Card> playerCards = new ArrayList<>();
    playerCards.add(cards.getPrimaryPile().get(0));
    playerCards.add(cards.getPrimaryPile().get(1));
    playerCards.add(cards.getPrimaryPile().get(2));

    Player player = new Player(3, "Charlie", 3, 0, playerCards, null);

    // Act
    ApiResponse<Player> result = gameService.addPlayer(player);

    // Assert
    assertEquals(200, result.getStatusCode());
    assertEquals("Player added successfully.", result.getMessage());
    assertEquals(player, result.getData());
  }

  @Test
  void testAddPlayer_playerNameExists() {
    // Arrange
    Cards cards = UnitTestUtil.initTestCards();
    List<Card> playerCards = new ArrayList<>();
    playerCards.add(cards.getPrimaryPile().get(0));
    playerCards.add(cards.getPrimaryPile().get(1));
    playerCards.add(cards.getPrimaryPile().get(2));

    Player player = new Player(3, "Alice", 3, 0, playerCards, null);

    // Act
    ApiResponse<Player> result = gameService.addPlayer(player);

    // Assert
    assertEquals(400, result.getStatusCode());
    assertEquals("Player name already exists.", result.getMessage());
    assertTrue(result.getErrors().containsKey("playerName"));
    assertEquals("Player with name 'Alice' already exists in the game.",
        result.getErrors().get("playerName"));
  }

  @Test
  void testAddPlayer_playerIdExists() {
    // Arrange
    Cards cards = UnitTestUtil.initTestCards();
    List<Card> playerCards = new ArrayList<>();
    playerCards.add(cards.getPrimaryPile().get(0));
    playerCards.add(cards.getPrimaryPile().get(1));
    playerCards.add(cards.getPrimaryPile().get(2));

    Player player = new Player(1, "Charlie", 3, 0, playerCards, null);

    // Act
    ApiResponse<Player> result = gameService.addPlayer(player);

    // Assert
    assertEquals(400, result.getStatusCode());
    assertEquals("Player id already exists.", result.getMessage());
    assertTrue(result.getErrors().containsKey("playerId"));
    assertEquals("Player with id '1' already exists in the game.",
        result.getErrors().get("playerId"));
  }

  @Test
  void testAddPlayer_playerIsNull() {
    // Act
    ApiResponse<Player> result = gameService.addPlayer(null);

    // Assert
    assertEquals(400, result.getStatusCode());
    assertEquals("Player not found.", result.getMessage());
    assertTrue(result.getErrors().containsKey("player"));
    assertEquals("Player object is null. Please provide a valid player object.",
        result.getErrors().get("player"));
  }

  @Test
  void testAddPlayer_playerIdIsInvalid() {
    // Arrange
    Cards cards = UnitTestUtil.initTestCards();
    List<Card> playerCards = new ArrayList<>();
    playerCards.add(cards.getPrimaryPile().get(0));
    playerCards.add(cards.getPrimaryPile().get(1));
    playerCards.add(cards.getPrimaryPile().get(2));

    Player player = new Player(0, "Charlie", 3, 0, playerCards, null);

    // Act
    ApiResponse<Player> result = gameService.addPlayer(player);

    // Assert
    assertEquals(400, result.getStatusCode());
    assertEquals("Invalid player id.", result.getMessage());
    assertTrue(result.getErrors().containsKey("id"));
    assertEquals("Player id must be greater than 0.", result.getErrors().get("id"));
  }

  @ParameterizedTest
  @EmptySource
  @NullSource
  @ValueSource(strings = {" ", "  "})
  void testAddPlayer_playerNameIsInvalid(String name) {
    // Test for empty, null, and blank player names
    Cards cards = UnitTestUtil.initTestCards();
    List<Card> playerCards = new ArrayList<>();
    playerCards.add(cards.getPrimaryPile().get(0));
    playerCards.add(cards.getPrimaryPile().get(1));
    playerCards.add(cards.getPrimaryPile().get(2));

    Player player = new Player(3, name, 3, 0, playerCards, null);

    // Act
    ApiResponse<Player> result = gameService.addPlayer(player);

    // Assert
    assertEquals(400, result.getStatusCode());
    assertEquals("Invalid player name.", result.getMessage());
    assertTrue(result.getErrors().containsKey("name"));
    assertEquals("Player name must not be empty.", result.getErrors().get("name"));
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
  void testDrawRandomCard_success() {
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

    // Assert that the card id is not found from the primary pile
    assertFalse(primaryPile.stream().anyMatch(c -> Objects.equals(c.getId(), card.getId())));
    assertTrue(tablePile.contains(card) || researchPile.contains(card));
    assertTrue(card.isDisplayImage());
  }

  @Test
  void testDrawRandomCard_primaryPileIsEmpty() {
    // Arrange
    gameState.getCards().getPrimaryPile().clear();

    // Act
    ApiResponse<Card> result = gameService.drawRandomCard();

    // Assert
    assertEquals(400, result.getStatusCode());
    assertEquals("No cards available.", result.getMessage());
    assertEquals("No cards available in the primary pile.", result.getErrors().get("cards"));
  }

  @Test
  void testDrawRandomCard_duplicateColoredShips() {
    // Arrange
    List<Card> primaryPile = gameState.getCards().getPrimaryPile();
    List<Card> tablePile = gameState.getCards().getTablePile();

    // Add duplicate colored ships to the table pile
    CardUtil.moveCardFromListToList(primaryPile, tablePile, 61);
    CardUtil.moveCardFromListToList(primaryPile, tablePile, 62);

    assertEquals(119 - 2 - gameState.getPlayers().size() * 3, primaryPile.size());
    assertEquals(2, tablePile.size());

    // Act
    ApiResponse<Card> result = gameService.drawRandomCard();
    Card card = result.getData();

    // Assert
    assertNull(card);
    assertEquals(400, result.getStatusCode());
    assertEquals("Duplicate colored ships.", result.getMessage());
    assertEquals(
        "The table pile contains two ships with the same name. Moving cards to discard pile.",
        result.getErrors().get("table"));
  }
}