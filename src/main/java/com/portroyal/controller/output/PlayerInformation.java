package com.portroyal.controller.output;

import com.portroyal.model.cards.Card;
import com.portroyal.model.cards.character.CharacterAbility;
import java.util.List;

public class PlayerInformation {

  private String name;
  private int coins;
  private int score;
  private List<Card> cards;
  private List<CharacterAbility> abilities;

  public PlayerInformation(String name, int coins, int score, List<Card> cards,
      List<CharacterAbility> abilities) {

  }
}
