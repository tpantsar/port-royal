package com.portroyal.model;

import com.portroyal.model.cards.Card;
import com.portroyal.model.cards.character.CharacterAbility;
import java.util.List;

public class Player {

  private String name;
  private int coins;
  private int score;
  private List<Card> cards;
  private List<CharacterAbility> abilities;

  public Player(String name, int coins, int score, List<Card> cards,
      List<CharacterAbility> abilities) {
    this.name = name;
    this.coins = coins;
    this.score = score;
    this.cards = cards;
    this.abilities = abilities;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getCoins() {
    return coins;
  }

  public void setCoins(int coins) {
    this.coins = coins;
  }

  public int getScore() {
    return score;
  }

  public void setScore(int score) {
    this.score = score;
  }

  public List<Card> getCards() {
    return cards;
  }

  public void setCards(List<Card> cards) {
    this.cards = cards;
  }

  public List<CharacterAbility> getAbilities() {
    return abilities;
  }

  public void setAbilities(List<CharacterAbility> abilities) {
    this.abilities = abilities;
  }
}
