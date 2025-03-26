package com.portroyal.model.cards;

import java.util.ArrayList;
import java.util.List;

public class Cards {

  private List<Card> primaryPile;
  private List<Card> tablePile;
  private List<Card> discardPile;
  private List<Card> researchPile;

  public Cards(List<Card> cards) {
    this.primaryPile = cards;
    this.tablePile = new ArrayList<>();
    this.discardPile = new ArrayList<>();
    this.researchPile = new ArrayList<>();
  }

  public List<Card> getPrimaryPile() {
    return primaryPile;
  }

  public void setPrimaryPile(List<Card> primaryPile) {
    this.primaryPile = primaryPile;
  }

  public List<Card> getTablePile() {
    return tablePile;
  }

  public void setTablePile(List<Card> tablePile) {
    this.tablePile = tablePile;
  }

  public List<Card> getDiscardPile() {
    return discardPile;
  }

  public void setDiscardPile(List<Card> discardPile) {
    this.discardPile = discardPile;
  }

  public List<Card> getResearchPile() {
    return researchPile;
  }

  public void setResearchPile(List<Card> researchPile) {
    this.researchPile = researchPile;
  }
}
