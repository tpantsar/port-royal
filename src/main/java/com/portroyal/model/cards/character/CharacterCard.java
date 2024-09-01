package com.portroyal.model.cards.character;

import com.portroyal.controller.output.CardType;
import com.portroyal.model.cards.Card;
import java.util.List;

public class CharacterCard extends Card {

  private int victoryPoints;
  private int characterCost;
  private List<CharacterAbility> abilities;

  public CharacterCard(final Integer id, final String name, final CardType type,
      boolean displayImage,
      final String imageName, final int victoryPoints, final int characterCost,
      final List<CharacterAbility> abilities) {
    super(id, name, type, displayImage, imageName);
    this.victoryPoints = victoryPoints;
    this.characterCost = characterCost;
    this.abilities = abilities;
  }

  public CharacterCard(final Card card, final int victoryPoints, final int characterCost,
      final List<CharacterAbility> abilities) {
    super(card);
    this.victoryPoints = victoryPoints;
    this.characterCost = characterCost;
    this.abilities = abilities;
  }

  public int getVictoryPoints() {
    return victoryPoints;
  }

  public void setVictoryPoints(int victoryPoints) {
    this.victoryPoints = victoryPoints;
  }

  public int getCharacterCost() {
    return characterCost;
  }

  public void setCharacterCost(int characterCost) {
    this.characterCost = characterCost;
  }

  public List<CharacterAbility> getAbilities() {
    return abilities;
  }

  public void setAbilities(List<CharacterAbility> abilities) {
    this.abilities = abilities;
  }
}
