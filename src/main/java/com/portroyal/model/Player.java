package com.portroyal.model;

import com.portroyal.controller.output.PlayerInformation;
import com.portroyal.model.cards.Card;
import com.portroyal.model.cards.character.CharacterAbility;
import java.util.List;
import java.util.Objects;

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

  public PlayerInformation toPlayerInformation() {
    return new PlayerInformation(name, coins, score, cards, abilities);
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Player player = (Player) o;
    return coins == player.coins && score == player.score && Objects.equals(name,
        player.name) && Objects.equals(cards, player.cards) && Objects.equals(
        abilities, player.abilities);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, coins, score, cards, abilities);
  }

  @Override
  public String toString() {
    final StringBuilder sb = new StringBuilder("Player{");
    sb.append("name='").append(name).append('\'');
    sb.append(", coins=").append(coins);
    sb.append(", score=").append(score);
    sb.append(", cards=").append(cards);
    sb.append(", abilities=").append(abilities);
    sb.append('}');
    return sb.toString();
  }
}
