package com.portroyal.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import com.portroyal.util.RandomUtil;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GameSetupService {

  // No-argument constructor
  public GameSetupService() {
  }

  public Cards initCards() {
    List<Card> cards = new ArrayList<>();
    ObjectMapper objectMapper = new ObjectMapper();
    final String CARDS_FILE_PATH = "src/main/resources/static/allCards.json";

    try {
      // Read JSON file content into a List of Map objects
      List<Map<String, Object>> jsonList = objectMapper.readValue(
          Files.readAllBytes(Paths.get(CARDS_FILE_PATH)),
          new TypeReference<>() {
          });

      for (Map<String, Object> jsonMap : jsonList) {
        int id = jsonMap.get("id") != null ? (Integer) jsonMap.get("id") : 0;
        String name = jsonMap.get("name") != null ? (String) jsonMap.get("name") : "";
        boolean displayImage =
            jsonMap.get("displayImage") != null && (Boolean) jsonMap.get("displayImage");
        String imageName =
            jsonMap.get("imageName") != null ? (String) jsonMap.get("imageName") : "";

        if (id >= 0 && id <= 60) { // CharacterCard
          List<CharacterAbility> abilities = new ArrayList<>();
          List<String> abilitiesStr = objectMapper.convertValue(jsonMap.get("abilities"),
              new TypeReference<>() {
              });

          for (String abilityStr : abilitiesStr) {
            abilities.add(convertToCharacterAbility(abilityStr));
          }

          int characterCost =
              jsonMap.get("characterCost") != null ? (Integer) jsonMap.get("characterCost") : 0;
          int victoryPoints =
              jsonMap.get("victoryPoints") != null ? (Integer) jsonMap.get("victoryPoints") : 0;

          CharacterCard characterCard = new CharacterCard(id, name, CardType.CHARACTER,
              displayImage,
              imageName, victoryPoints, characterCost, abilities);
          cards.add(characterCard);
        } else if (id >= 61 && id <= 110) { // ShipCard
          int shipWeapons =
              jsonMap.get("shipWeapons") != null ? (Integer) jsonMap.get("shipWeapons") : 0;
          int shipCoins = jsonMap.get("shipCoins") != null ? (Integer) jsonMap.get("shipCoins") : 0;

          ShipCard shipCard = new ShipCard(id, name, CardType.SHIP, displayImage, imageName,
              shipWeapons, shipCoins);
          cards.add(shipCard);
        } else if (id >= 111 && id <= 114) { // Create TaxCard for tax cards
          String taxModeStr = jsonMap.get("taxMode") != null ? (String) jsonMap.get("taxMode") : "";
          TaxMode taxMode = convertToTaxMode(taxModeStr);

          TaxCard taxCard = new TaxCard(id, name, CardType.TAX, displayImage, imageName, taxMode);
          cards.add(taxCard);
        } else if (id >= 115 && id <= 119) { // Create ResearchCard for research cards
          List<ResearchMode> researchMode = new ArrayList<>();
          List<String> researchModeStr = objectMapper.convertValue(jsonMap.get("researchMode"),
              new TypeReference<>() {
              });

          for (String modeStr : researchModeStr) {
            researchMode.add(convertToResearchMode(modeStr));
          }

          int coinsAmount =
              jsonMap.get("coinsAmount") != null ? (Integer) jsonMap.get("coinsAmount") : 0;
          int victoryPoints =
              jsonMap.get("victoryPoints") != null ? (Integer) jsonMap.get("victoryPoints") : 0;

          ResearchCard researchCard = new ResearchCard(id, name, CardType.RESEARCH, displayImage,
              imageName, researchMode, coinsAmount, victoryPoints);
          cards.add(researchCard);
        }
      }
    } catch (IOException e) {
      System.err.println("Error reading JSON file: " + e.getMessage());
      throw new RuntimeException("Failed to initialize cards", e);
    }
    return new Cards(cards);
  }

  private List<Card> initPlayerCards(int initialPlayerCoins, Cards cards) {
    List<Card> initialPlayerCards = new ArrayList<>(initialPlayerCoins);

    // Set initial player coins for selecting random cards from the deck (displayImage = false)
    for (int i = 0; i < initialPlayerCoins; i++) {
      List<Card> primaryPile = cards.getPrimaryPile();
      List<Card> discardPile = cards.getDiscardPile();

      final Card randomCard = RandomUtil.getRandomCardFromPrimaryPile(primaryPile, discardPile);
      randomCard.setDisplayImage(false);
      initialPlayerCards.add(randomCard);
    }

    return initialPlayerCards;
  }

  // Test players
  public List<Player> initPlayers(Cards cards) {
    List<Player> players = new ArrayList<>();

    // Initial coins for each player, equals the number of cards they start with
    int initialPlayerCoins = 3;

    players.add(
        new Player(1, "Alice", initialPlayerCoins, 0, initPlayerCards(initialPlayerCoins, cards),
            new ArrayList<>()));
    players.add(
        new Player(2, "Bob", initialPlayerCoins, 0, initPlayerCards(initialPlayerCoins, cards),
            new ArrayList<>()));
    return players;
  }

  public TaxMode convertToTaxMode(String taxModeStr) {
    return switch (taxModeStr) {
      case "LowestPoints" -> TaxMode.LOWEST_POINTS;
      case "MostSwords" -> TaxMode.MOST_SWORDS;
      default -> throw new IllegalArgumentException("Unknown tax mode: " + taxModeStr);
    };
  }

  public CharacterAbility convertToCharacterAbility(String abilityStr) {
    return switch (abilityStr) {
      case "fiveCards" -> CharacterAbility.FIVE_CARDS;
      case "oneCheaper" -> CharacterAbility.ONE_CHEAPER;
      case "boardEmpty" -> CharacterAbility.BOARD_EMPTY;
      case "extraCard" -> CharacterAbility.EXTRA_CARD;
      case "extraCoin_skiff" -> CharacterAbility.EXTRA_COIN_SKIFF;
      case "extraCoin_flute" -> CharacterAbility.EXTRA_COIN_FLUTE;
      case "extraCoin_frigate" -> CharacterAbility.EXTRA_COIN_FRIGATE;
      case "extraCoin_galleon" -> CharacterAbility.EXTRA_COIN_GALLEON;
      case "extraCoin_pinance" -> CharacterAbility.EXTRA_COIN_PINANCE;
      case "swords" -> CharacterAbility.SWORDS;
      case "house" -> CharacterAbility.HOUSE;
      case "anchor" -> CharacterAbility.ANCHOR;
      case "cross" -> CharacterAbility.CROSS;
      default -> throw new IllegalArgumentException("Unknown character ability: " + abilityStr);
    };
  }

  public ResearchMode convertToResearchMode(String researchModeStr) {
    return switch (researchModeStr) {
      case "anchor" -> ResearchMode.ANCHOR;
      case "cross" -> ResearchMode.CROSS;
      case "house" -> ResearchMode.HOUSE;
      default -> throw new IllegalArgumentException("Unknown research mode: " + researchModeStr);
    };
  }
}