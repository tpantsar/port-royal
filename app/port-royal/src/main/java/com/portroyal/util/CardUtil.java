package com.portroyal.util;

import com.portroyal.model.cards.Card;
import com.portroyal.model.cards.character.CharacterCard;
import com.portroyal.model.cards.research.ResearchCard;
import com.portroyal.model.cards.ship.ShipCard;
import com.portroyal.model.cards.tax.TaxCard;
import java.util.List;

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

  public static Card getCardFromListById(List<Card> cards, int cardId) {
    return cards.stream().filter(card -> card.getId() == cardId).findFirst().orElse(null);
  }
}
