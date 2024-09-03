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

class GameServiceImplTest {

  private GameState gameState;
  private GameService gameService;

  @BeforeEach
  void setUp() {
    GameSetupService gameSetupService = new GameSetupService();
    gameState = new GameState(gameSetupService);
    gameService = new GameServiceImpl(gameState);
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
    //List<Card> primaryPile = new ArrayList<>();
    //List<Card> tablePile = new ArrayList<>();
    //List<Card> discardPile = new ArrayList<>();
    //List<Card> researchPile = new ArrayList<>();
    //when(gameState.getCards().getPrimaryPile()).thenReturn(primaryPile);
    //when(gameState.getCards().getTablePile()).thenReturn(tablePile);
    //when(gameState.getCards().getDiscardPile()).thenReturn(discardPile);
    //when(gameState.getCards().getResearchPile()).thenReturn(researchPile);

    List<Card> primaryPile = gameState.getCards().getPrimaryPile();
    List<Card> tablePile = gameState.getCards().getTablePile();

    // Card characterCard = UnitTestUtil.createCharacterCard();
    // primaryPile.add(characterCard);

    // Act
    ApiResponse<Card> result = gameService.drawRandomCard();

    // Assert
    assertEquals(200, result.getStatusCode());
    assertEquals("Card drawn successfully.", result.getMessage());

    assertTrue(primaryPile.isEmpty());
    assertTrue(tablePile.contains(result.getData()));

    //assertTrue(tablePile.contains(characterCard));
    //assertTrue(primaryPile.isEmpty());
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