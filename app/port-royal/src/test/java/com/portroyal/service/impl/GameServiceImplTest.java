package com.portroyal.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import com.portroyal.UnitTestUtil;
import com.portroyal.controller.output.ApiResponse;
import com.portroyal.model.GameState;
import com.portroyal.model.cards.Card;
import com.portroyal.service.GameService;
import com.portroyal.service.GameSetupService;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

class GameServiceImplTest {

  private GameState gameState;
  private GameSetupService gameSetupService;
  private GameService gameService;

  @BeforeEach
  void setUp() {
    // Create a mock or real instance of GameSetupService
    gameSetupService = Mockito.mock(GameSetupService.class);

    // Initialize GameState with the GameSetupService
    gameState = new GameState(gameSetupService);

    // Initialize GameService with the GameState
    gameService = new GameServiceImpl(gameState);

    // Set up any additional configurations or states needed for the tests
    // For example, you can mock the methods of gameSetupService to return specific values
    Mockito.when(gameSetupService.initPlayers()).thenReturn(UnitTestUtil.createTestPlayers());
    Mockito.when(gameSetupService.initCards()).thenReturn(UnitTestUtil.createTestCards());

    // Initialize the game state
    gameState.initGame();
  }

  @AfterEach
  void tearDown() {
  }

  @Test
  void getGameStateFull() {
  }

  @Test
  void getGameStateSimple() {
  }

  @Test
  void getPlayers() {
  }

  @Test
  void addPlayer() {
  }

  @Test
  void buyCharacterCard() {
  }

  @Test
  void drawRandomCardSuccessfully() {
    // Arrange
    List<Card> primaryPile = gameState.getCards().getPrimaryPile();
    List<Card> tablePile = gameState.getCards().getTablePile();
    List<Card> researchPile = gameState.getCards().getResearchPile();

    // Act
    ApiResponse<Card> result = gameService.drawRandomCard();

    // Assert
    assertEquals(200, result.getStatusCode());
    assertEquals("Card drawn successfully.", result.getMessage());

    Card card = result.getData();

    assertTrue(!primaryPile.contains(card));
    assertTrue(tablePile.contains(card) || researchPile.contains(card));
    assertTrue(card.isDisplayImage());
  }

  @Test
  void drawRandomCardNoCardsAvailable() {
    // Arrange
    List<Card> primaryPile = new ArrayList<>();
    List<Card> discardPile = new ArrayList<>();
    when(gameState.getCards().getPrimaryPile()).thenReturn(primaryPile);
    when(gameState.getCards().getDiscardPile()).thenReturn(discardPile);

    // Act
    ApiResponse<Card> response = gameService.drawRandomCard();

    // Assert
    assertEquals(404, response.getStatusCode());
    assertEquals("No cards available in the primary pile.", response.getMessage());
  }
}