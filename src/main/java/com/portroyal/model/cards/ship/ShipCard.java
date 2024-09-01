package com.portroyal.model.cards.ship;

import com.portroyal.controller.output.CardType;
import com.portroyal.model.cards.Card;

public class ShipCard extends Card {

  private int shipWeapons;
  private int shipCoins;

  public ShipCard(final Integer id, final String name, final CardType type, boolean displayImage,
      final String imageName, final int shipWeapons, final int shipCoins) {
    super(id, name, type, displayImage, imageName);
    this.shipWeapons = shipWeapons;
    this.shipCoins = shipCoins;
  }

  public ShipCard(final Card card, final int shipWeapons, final int shipCoins) {
    super(card);
    this.shipWeapons = shipWeapons;
    this.shipCoins = shipCoins;
  }

  public int getShipWeapons() {
    return shipWeapons;
  }

  public void setShipWeapons(int shipWeapons) {
    this.shipWeapons = shipWeapons;
  }

  public int getShipCoins() {
    return shipCoins;
  }

  public void setShipCoins(int shipCoins) {
    this.shipCoins = shipCoins;
  }
}
