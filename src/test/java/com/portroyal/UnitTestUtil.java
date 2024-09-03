package com.portroyal;

import com.portroyal.controller.output.CardType;
import com.portroyal.model.cards.Card;
import com.portroyal.model.cards.character.CharacterAbility;
import com.portroyal.model.cards.character.CharacterCard;
import java.util.ArrayList;
import java.util.List;

public class UnitTestUtil {

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
}
