package com.portroyal.util;

import com.portroyal.model.cards.Card;
import java.util.List;
import java.util.Random;

public class RandomUtil {

  public static Card popRandomCardFromPrimaryPile(List<Card> primaryPile, List<Card> discardPile) {
    if (primaryPile.isEmpty()) {
      try {
        // Move all discard pile cards into the primary pile
        primaryPile.addAll(discardPile);
        discardPile.clear();
      } catch (Exception e) {
        throw new RuntimeException("No cards available in the primary pile.");
      }
    }
    Random random = new Random();
    int randomIndex = random.nextInt(primaryPile.size());
    return primaryPile.remove(randomIndex);
  }

  public static Card getRandomCardFromTablePile(List<Card> tablePile) {
    if (tablePile.isEmpty()) {
      throw new RuntimeException("No cards available in the table pile.");
    }
    Random random = new Random();
    int randomIndex = random.nextInt(tablePile.size());
    return tablePile.get(randomIndex);
  }
}
