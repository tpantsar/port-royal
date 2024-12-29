package com.portroyal.util;

import com.portroyal.controller.output.CardType;
import com.portroyal.model.Player;
import com.portroyal.model.cards.Card;
import com.portroyal.model.cards.character.CharacterCard;
import com.portroyal.model.cards.research.ResearchCard;
import com.portroyal.model.cards.ship.ShipCard;
import com.portroyal.model.cards.tax.TaxCard;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CardUtil {

  public static Card resolveCardType(Card card) {
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

  public static void moveAllCardsFromListToList(List<Card> source, List<Card> destination) {
    destination.addAll(source);
    source.clear();
  }

  public static void moveAmountOfCardsFromListToList(List<Card> source, List<Card> destination,
      int amount) {
    for (int i = 0; i < amount; i++) {
      Card card = source.remove(0);
      card.setDisplayImage(true);
      destination.add(card);
    }
  }

  public static void moveCardFromListToList(List<Card> source, List<Card> destination, int cardId) {
    Card card = getCardFromListById(source, cardId);
    if (card != null) {
      source.remove(card);
      destination.add(card);
    }
  }

  public static Card getCardFromListById(List<Card> cards, int cardId) {
    return cards.stream().filter(card -> card.getId() == cardId).findFirst().orElse(null);
  }

  // Returns true if the table pile contains two ships with the same name
  public static boolean hasDuplicateColoredShips(List<Card> tablePile) {
    Set<String> shipNames = new HashSet<>();
    List<ShipCard> ships = tablePile.stream().filter(card -> card.getType().equals(CardType.SHIP))
        .map(card -> (ShipCard) card).toList();

    for (ShipCard ship : ships) {
      if (!shipNames.add(ship.getName())) {
        // The name already exists in the set, meaning it's a duplicate
        return true;
      }
    }

    return false; // No duplicates found
  }

  public static void moveCoinCardsFromPlayerToList(Player player, List<Card> destination,
      int amountOfCoinCards) {
    // Filter out the coin cards (displayImage=false) from the player's cards (displayImage=true)
    // Coin cards are upside down and are not visible to the player
    List<Card> coinCards = player.getCards().stream().filter(card -> !card.isDisplayImage())
        .toList();
    moveAmountOfCardsFromListToList(coinCards, destination, amountOfCoinCards);
  }
}
