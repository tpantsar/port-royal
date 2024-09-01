package com.portroyal.model.cards.tax;

import com.portroyal.controller.output.CardType;
import com.portroyal.model.cards.Card;

public class TaxCard extends Card {

  private TaxMode taxMode;

  public TaxCard(final Integer id, final String name, final CardType type, boolean displayImage,
      final String imageName, final TaxMode taxMode) {
    super(id, name, type, displayImage, imageName);
    this.taxMode = taxMode;
  }

  public TaxCard(final Card card, final TaxMode taxMode) {
    super(card);
    this.taxMode = taxMode;
  }

  public TaxMode getTaxMode() {
    return taxMode;
  }

  public void setTaxMode(TaxMode taxMode) {
    this.taxMode = taxMode;
  }
}
