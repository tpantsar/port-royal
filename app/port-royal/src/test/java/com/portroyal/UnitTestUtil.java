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

  private static final int TEST_COINS = 15;
  private static final int TEST_SCORE = 0;

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

  public static List<Player> createTestPlayers() {
    List<Player> players = new ArrayList<>();
    players.add(
        new Player(1, "Alice", TEST_COINS, TEST_SCORE, new ArrayList<>(), new ArrayList<>()));
    players.add(new Player(2, "Bob", TEST_COINS, TEST_SCORE, new ArrayList<>(), new ArrayList<>()));
    players.add(
        new Player(3, "Charlie", TEST_COINS, TEST_SCORE, new ArrayList<>(), new ArrayList<>()));
    return players;
  }

  public static Cards createTestCards() {
    List<Card> cards = new ArrayList<>();
    cards.add(createTestCharacterCard(1));
    cards.add(createTestShipCard(61));
    cards.add(createTestTaxCard(111));
    cards.add(createTestResearchCard(115));
    return new Cards(cards);
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
