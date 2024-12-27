package com.portroyal.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.portroyal.model.Player;
import com.portroyal.model.cards.Cards;
import com.portroyal.model.cards.character.CharacterAbility;
import com.portroyal.model.cards.research.ResearchMode;
import com.portroyal.model.cards.tax.TaxMode;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

class GameSetupServiceTest {

  private GameSetupService gameSetupService;
  private Cards mockCards;

  @BeforeEach
  void setUp() {
    gameSetupService = new GameSetupService();
    mockCards = Mockito.mock(Cards.class);
  }

  @Test
  void initCards_shouldInitializeCardsCorrectly() {
    Cards initialCards = gameSetupService.initCards();
    assertNotNull(initialCards);
    assertEquals(119, initialCards.getPrimaryPile().size());
    assertTrue(initialCards.getTablePile().isEmpty());
    assertTrue(initialCards.getDiscardPile().isEmpty());
    assertTrue(initialCards.getResearchPile().isEmpty());
  }

  @Test
  void initPlayers_shouldInitializePlayersCorrectly() {
    Cards initialCards = gameSetupService.initCards();
    List<Player> initialPlayers = gameSetupService.initPlayers(initialCards);
    assertNotNull(initialPlayers);
    assertEquals(2, initialPlayers.size());

    Player player1 = initialPlayers.get(0);
    Player player2 = initialPlayers.get(1);

    assertEquals("Alice", player1.getName());
    assertEquals(0, player1.getScore());
    assertEquals(3, player1.getCoins());
    assertEquals(3, player1.getCards().size());
    assertEquals(0, player1.getAbilities().size());

    assertEquals("Bob", player2.getName());
    assertEquals(0, player2.getScore());
    assertEquals(3, player2.getCoins());
    assertEquals(3, player2.getCards().size());
    assertEquals(0, player2.getAbilities().size());
  }

  @Test
  void convertToTaxMode_shouldReturnCorrectTaxMode() {
    assertEquals(TaxMode.LOWEST_POINTS, gameSetupService.convertToTaxMode("LowestPoints"));
    assertEquals(TaxMode.MOST_SWORDS, gameSetupService.convertToTaxMode("MostSwords"));
    assertThrows(IllegalArgumentException.class,
        () -> gameSetupService.convertToTaxMode("InvalidMode"));
  }

  @Test
  void convertToCharacterAbility_shouldReturnCorrectCharacterAbility() {
    assertEquals(CharacterAbility.FIVE_CARDS,
        gameSetupService.convertToCharacterAbility("fiveCards"));
    assertEquals(CharacterAbility.ONE_CHEAPER,
        gameSetupService.convertToCharacterAbility("oneCheaper"));
    assertThrows(IllegalArgumentException.class,
        () -> gameSetupService.convertToCharacterAbility("InvalidAbility"));
  }

  @Test
  void convertToResearchMode_shouldReturnCorrectResearchMode() {
    assertEquals(ResearchMode.ANCHOR, gameSetupService.convertToResearchMode("anchor"));
    assertEquals(ResearchMode.CROSS, gameSetupService.convertToResearchMode("cross"));
    assertThrows(IllegalArgumentException.class,
        () -> gameSetupService.convertToResearchMode("InvalidMode"));
  }
}