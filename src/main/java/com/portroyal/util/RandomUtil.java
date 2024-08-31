package com.portroyal.util;

import java.util.List;
import java.util.Random;

public class RandomUtil {

  public static <T> T popRandomElementFromList(List<T> primaryPile, List<T> discardPile) {
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
}
