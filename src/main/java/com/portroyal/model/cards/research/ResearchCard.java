package com.portroyal.model.cards.research;

import com.portroyal.controller.output.CardType;
import com.portroyal.model.cards.Card;
import java.util.List;

public class ResearchCard extends Card {

  private List<ResearchMode> researchMode;
  private int coinsAmount;
  private int victoryPoints;

  public ResearchCard(final Integer id, final String name, final CardType type,
      boolean displayImage,
      final String imageName, final List<ResearchMode> researchMode, final int coinsAmount,
      final int victoryPoints) {
    super(id, name, type, displayImage, imageName);
    this.researchMode = researchMode;
    this.coinsAmount = coinsAmount;
    this.victoryPoints = victoryPoints;
  }

  public List<ResearchMode> getResearchMode() {
    return researchMode;
  }

  public void setResearchMode(List<ResearchMode> researchMode) {
    this.researchMode = researchMode;
  }

  public int getCoinsAmount() {
    return coinsAmount;
  }

  public void setCoinsAmount(int coinsAmount) {
    this.coinsAmount = coinsAmount;
  }

  public int getVictoryPoints() {
    return victoryPoints;
  }

  public void setVictoryPoints(int victoryPoints) {
    this.victoryPoints = victoryPoints;
  }
}
