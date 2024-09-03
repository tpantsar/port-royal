package com.portroyal.model.cards.research;

import com.portroyal.controller.output.CardType;
import com.portroyal.model.cards.Card;
import java.util.List;
import java.util.Objects;

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

  public ResearchCard(final Card card, final List<ResearchMode> researchMode, final int coinsAmount,
      final int victoryPoints) {
    super(card);
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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResearchCard that = (ResearchCard) o;
    return coinsAmount == that.coinsAmount && victoryPoints == that.victoryPoints
        && Objects.equals(researchMode, that.researchMode);
  }

  @Override
  public int hashCode() {
    return Objects.hash(researchMode, coinsAmount, victoryPoints);
  }


  @Override
  public String toString() {
    final StringBuilder sb = new StringBuilder("ResearchCard{");
    sb.append("researchMode=").append(researchMode);
    sb.append(", coinsAmount=").append(coinsAmount);
    sb.append(", victoryPoints=").append(victoryPoints);
    sb.append('}');
    return sb.toString();
  }
}
