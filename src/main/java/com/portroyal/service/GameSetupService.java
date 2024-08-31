package com.portroyal.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.portroyal.controller.output.CardType;
import com.portroyal.model.GameStatus;
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

  private final List<Player> players;
  private final Cards cards;
  private final Player currentPlayer; // The current player in turn
  private final boolean duplicateColoredShips;
  private final GameStatus status;

  public GameSetupService() {
    this.cards = initCards("src/main/resources/static/allCards.json");
    this.players = initPlayers();
    this.currentPlayer = players.getFirst();
    this.duplicateColoredShips = false;
    this.status = GameStatus.IN_PROGRESS;
  }

  public List<Player> getPlayers() {
    return players;
  }

  public Cards getCards() {
    return cards;
  }

  public Player getCurrentPlayer() {
    return currentPlayer;
  }

  public boolean isDuplicateColoredShips() {
    return duplicateColoredShips;
  }

  public GameStatus getStatus() {
    return status;
  }

  public Cards initCards(String filePath) {
    List<Card> cards = new ArrayList<>();
    ObjectMapper objectMapper = new ObjectMapper();

    try {
      // Read JSON file content into a List of Map objects
      List<Map<String, Object>> jsonList = objectMapper.readValue(
          Files.readAllBytes(Paths.get(filePath)),
          new TypeReference<>() {
          });

      for (Map<String, Object> jsonMap : jsonList) {
        Integer id = (Integer) jsonMap.get("id");
        String name = (String) jsonMap.get("name");
        boolean displayImage = (Boolean) jsonMap.get("displayImage");
        String imageName = (String) jsonMap.get("imageName");

        if (id >= 0 && id <= 60) { // CharacterCard
          int characterCost = (Integer) jsonMap.get("characterCost");
          List<CharacterAbility> abilities = (List<CharacterAbility>) jsonMap.get("abilities");
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
          TaxMode taxMode = (TaxMode) jsonMap.get("taxMode");

          TaxCard taxCard = new TaxCard(id, name, CardType.TAX, displayImage, imageName, taxMode);
          cards.add(taxCard);
        } else if (id >= 115 && id <= 119) { // Create ResearchCard for research cards
          List<ResearchMode> researchMode = (List<ResearchMode>) jsonMap.get("researchMode");
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
    players.add(new Player("Alice", 15, 0, new ArrayList<>(), new ArrayList<>()));
    players.add(new Player("Bob", 15, 0, new ArrayList<>(), new ArrayList<>()));
    return players;
  }
}
