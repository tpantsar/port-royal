package com.portroyal;

import com.portroyal.controller.output.CardType;
import com.portroyal.model.Player;
import com.portroyal.model.cards.Card;
import com.portroyal.model.cards.Cards;
import com.portroyal.model.cards.character.CharacterAbility;
import com.portroyal.model.cards.character.CharacterCard;
import com.portroyal.model.cards.research.ResearchCard;
import com.portroyal.model.cards.research.ResearchMode;
import com.portroyal.model.cards.ship.ShipCard;
import com.portroyal.model.cards.tax.TaxCard;
import com.portroyal.model.cards.tax.TaxMode;
import java.util.ArrayList;
import java.util.List;

public class UnitTestUtil {

  private static final int TEST_COINS_PLAYER_1 = 8;
  private static final int TEST_COINS_PLAYER_2 = 3;
  private static final int TEST_COINS_PLAYER_3 = 1;
  private static final int TEST_SCORE = 0;

  private static final List<Card> primaryPile = new ArrayList<>();

  public static CharacterCard createCharacterCard() {
    Card card = new Card(1, "test-name", CardType.CHARACTER, false, "test-imageName");
    return new CharacterCard(card, 2, 5, createCharacterAbilities());
  }

  public static List<CharacterAbility> createCharacterAbilities() {
    List<CharacterAbility> abilities = new ArrayList<>();
    abilities.add(CharacterAbility.HOUSE);
    abilities.add(CharacterAbility.ANCHOR);
    abilities.add(CharacterAbility.CROSS);
    return abilities;
  }

  public static List<Card> initTestPlayerCards(int cardsAmount) {
    final List<Card> playerCards = new ArrayList<>();

    for (int i = 0; i < cardsAmount; i++) {
      Card randomCard = primaryPile.get(
          (int) (Math.random() * UnitTestUtil.initTestCards().getPrimaryPile().size()));
      playerCards.add(randomCard);
      primaryPile.remove(randomCard);
    }

    return playerCards;
  }

  public static List<Player> initTestPlayers() {
    List<Player> players = new ArrayList<>();
    players.add(
        new Player(1, "Alice", TEST_COINS_PLAYER_1, TEST_SCORE,
            initTestPlayerCards(TEST_COINS_PLAYER_1),
            new ArrayList<>()));
    players.add(new Player(2, "Bob", TEST_COINS_PLAYER_2, TEST_SCORE,
        initTestPlayerCards(TEST_COINS_PLAYER_2),
        new ArrayList<>()));
    players.add(
        new Player(3, "Charlie", TEST_COINS_PLAYER_3, TEST_SCORE,
            initTestPlayerCards(TEST_COINS_PLAYER_3),
            new ArrayList<>()));
    return players;
  }

  public static Cards initTestCards() {
    primaryPile.add(createTestCharacterCard(1));
    primaryPile.add(createTestCharacterCard(2));
    primaryPile.add(createTestCharacterCard(3));
    primaryPile.add(createTestCharacterCard(4));
    primaryPile.add(createTestCharacterCard(5));
    primaryPile.add(createTestCharacterCard(6));
    primaryPile.add(createTestCharacterCard(7));
    primaryPile.add(createTestCharacterCard(8));
    primaryPile.add(createTestCharacterCard(9));
    primaryPile.add(createTestCharacterCard(10));
    primaryPile.add(createTestShipCard(61));
    primaryPile.add(createTestShipCard(62));
    primaryPile.add(createTestShipCard(63));
    primaryPile.add(createTestShipCard(64));
    primaryPile.add(createTestShipCard(65));
    primaryPile.add(createTestTaxCard(111));
    primaryPile.add(createTestTaxCard(112));
    primaryPile.add(createTestTaxCard(113));
    primaryPile.add(createTestTaxCard(114));
    primaryPile.add(createTestResearchCard(115));
    primaryPile.add(createTestResearchCard(116));
    primaryPile.add(createTestResearchCard(117));
    primaryPile.add(createTestResearchCard(118));
    primaryPile.add(createTestResearchCard(119));
    return new Cards(primaryPile);
  }

  public static CharacterCard createTestCharacterCard(int id) {
    Card card = new Card(id, "test-card-character", CardType.CHARACTER, false, "test-imageName");
    return new CharacterCard(card, 2, 5, createCharacterAbilities());
  }

  public static ResearchCard createTestResearchCard(int id) {
    Card card = new Card(id, "test-card-research", CardType.RESEARCH, false, "test-imageName");
    List<ResearchMode> researchMode = new ArrayList<>();
    researchMode.add(ResearchMode.HOUSE);
    researchMode.add(ResearchMode.ANCHOR);
    return new ResearchCard(card, researchMode, 1, 3);
  }

  public static ShipCard createTestShipCard(int id) {
    Card card = new Card(id, "test-card-ship", CardType.SHIP, false, "test-imageName");
    return new ShipCard(card, 2, 3);
  }

  public static TaxCard createTestTaxCard(int id) {
    Card card = new Card(id, "test-card-tax", CardType.TAX, false, "test-imageName");
    return new TaxCard(card, TaxMode.MOST_SWORDS);
  }

  public static Card createTestCard(int id, String name, CardType cardType) {
    return new Card(id, String.format("test-card-%s", name), cardType, false, "test-imageName");
  }

  public static Card createCardWithType(Card card) {
    return switch (card.getType()) {
      case CHARACTER -> new CharacterCard(card,
          ((CharacterCard) card).getVictoryPoints(),
          ((CharacterCard) card).getCharacterCost(), ((CharacterCard) card).getAbilities());
      case SHIP -> new ShipCard(card, ((ShipCard) card).getShipWeapons(),
          ((ShipCard) card).getShipCoins());
      case TAX -> new TaxCard(card, ((TaxCard) card).getTaxMode());
      case RESEARCH -> new ResearchCard(card,
          ((ResearchCard) card).getResearchMode(), ((ResearchCard) card).getCoinsAmount(),
          ((ResearchCard) card).getVictoryPoints());
    };
  }
}
