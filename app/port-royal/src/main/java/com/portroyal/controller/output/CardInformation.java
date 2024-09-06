package com.portroyal.controller.output;

import com.portroyal.model.cards.Card;
import com.portroyal.model.cards.character.CharacterAbility;
import com.portroyal.model.cards.tax.TaxMode;
import java.util.List;

public class CardInformation {

  // All cards
  private Integer id;
  private String name;
  private CardType type;
  private String imageName;
  private boolean displayImage;

  // Character cards
  private int characterCost;
  private List<CharacterAbility> abilities;

  // Character and research cards
  private int victoryPoints;

  // Tax cards
  private TaxMode taxMode;

  public CardInformation(Card card) {
    this.id = card.getId();
    this.name = card.getName();
    this.type = card.getType();
    this.imageName = card.getImageName();
    this.displayImage = card.isDisplayImage();

    // if (card.getType() == CardType.CHARACTER) {
    //   characterCost = card.getCharacterCost();
    //   this.characterCost = card.get();
    //   this.abilities = card.getAbilities();
    // }
    // if (card.getType() == CardType.CHARACTER || card.getType() == CardType.RESEARCH) {
    //   this.victoryPoints = card.getVictoryPoints();
    // }
    // if (card.getType() == CardType.TAX) {
    //   this.taxMode = card.getTaxMode();
    // }
  }
}
