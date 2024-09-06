package com.portroyal.model.cards.tax;

import com.portroyal.controller.output.CardType;
import com.portroyal.model.cards.Card;
import java.util.Objects;

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

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TaxCard taxCard = (TaxCard) o;
    return taxMode == taxCard.taxMode;
  }

  @Override
  public int hashCode() {
    return Objects.hash(taxMode);
  }

  @Override
  public String toString() {
    final StringBuilder sb = new StringBuilder("TaxCard{");
    sb.append("taxMode=").append(taxMode);
    sb.append('}');
    return sb.toString();
  }
}
