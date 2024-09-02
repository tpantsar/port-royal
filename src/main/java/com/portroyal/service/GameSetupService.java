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
        Integer id = (Integer) jsonMap.get("id");
        String name = (String) jsonMap.get("name");
        boolean displayImage = (Boolean) jsonMap.get("displayImage");
        String imageName = (String) jsonMap.get("imageName");

        if (id >= 0 && id <= 60) { // CharacterCard
          List<CharacterAbility> abilities = new ArrayList<>();
          List<String> abilitiesStr = (List<String>) jsonMap.get("abilities");

          for (String abilityStr : abilitiesStr) {
            abilities.add(convertToCharacterAbility(abilityStr));
          }

          int characterCost = (Integer) jsonMap.get("characterCost");
          int victoryPoints = (Integer) jsonMap.get("victoryPoints");

          CharacterCard characterCard = new CharacterCard(id, name, CardType.CHARACTER,
              displayImage,
              imageName, victoryPoints, characterCost, abilities);
          cards.add(characterCard);
        } else if (id >= 61 && id <= 110) { // ShipCard
          int shipWeapons = (Integer) jsonMap.get("shipWeapons");
          int shipCoins = (Integer) jsonMap.get("shipCoins");

          ShipCard shipCard = new ShipCard(id, name, CardType.SHIP, displayImage, imageName,
              shipWeapons, shipCoins);
          cards.add(shipCard);
        } else if (id >= 111 && id <= 114) { // Create TaxCard for tax cards
          String taxModeStr = (String) jsonMap.get("taxMode");
          TaxMode taxMode = convertToTaxMode(taxModeStr);

          TaxCard taxCard = new TaxCard(id, name, CardType.TAX, displayImage, imageName, taxMode);
          cards.add(taxCard);
        } else if (id >= 115 && id <= 119) { // Create ResearchCard for research cards
          List<ResearchMode> researchMode = new ArrayList<>();
          List<String> researchModeStr = (List<String>) jsonMap.get("researchMode");

          for (String modeStr : researchModeStr) {
            researchMode.add(convertToResearchMode(modeStr));
          }

          int coinsAmount = (Integer) jsonMap.get("coinsAmount");
          int victoryPoints = (Integer) jsonMap.get("victoryPoints");

          ResearchCard researchCard = new ResearchCard(id, name, CardType.RESEARCH, displayImage,
              imageName, researchMode, coinsAmount, victoryPoints);
          cards.add(researchCard);
        }
      }
    } catch (IOException e) {
      e.printStackTrace();
      //return ApiResponse.error("Error reading JSON file: ", e);
    }
    return new Cards(cards);
  }

  // Test players
  public List<Player> initPlayers() {
    List<Player> players = new ArrayList<>();
    players.add(new Player(1, "Alice", 15, 0, new ArrayList<>(), new ArrayList<>()));
    players.add(new Player(2, "Bob", 15, 0, new ArrayList<>(), new ArrayList<>()));
    return players;
  }

  private TaxMode convertToTaxMode(String taxModeStr) {
    return switch (taxModeStr) {
      case "LowestPoints" -> TaxMode.LOWEST_POINTS;
      case "MostSwords" -> TaxMode.MOST_SWORDS;
      default -> throw new IllegalArgumentException("Unknown tax mode: " + taxModeStr);
    };
  }

  private CharacterAbility convertToCharacterAbility(String abilityStr) {
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

  private ResearchMode convertToResearchMode(String researchModeStr) {
    return switch (researchModeStr) {
      case "anchor" -> ResearchMode.ANCHOR;
      case "cross" -> ResearchMode.CROSS;
      case "house" -> ResearchMode.HOUSE;
      default -> throw new IllegalArgumentException("Unknown research mode: " + researchModeStr);
    };
  }
}
