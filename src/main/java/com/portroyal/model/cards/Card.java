package com.portroyal.model.cards;

import com.portroyal.controller.output.CardType;

/* Base class for all card entities */
public class Card {

  private Integer id;
  private String name;
  private CardType type;
  private boolean displayImage;
  private String imageName;

  public Card(final Card card) {
    this.id = card.getId();
    this.name = card.getName();
    this.type = card.getType();
    this.displayImage = card.isDisplayImage();
    this.imageName = card.getImageName();
  }

  public Card(Integer id, String name, CardType type, boolean displayImage, String imageName) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.displayImage = displayImage;
    this.imageName = imageName;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public CardType getType() {
    return type;
  }

  public void setType(CardType type) {
    this.type = type;
  }

  public boolean isDisplayImage() {
    return displayImage;
  }

  public void setDisplayImage(boolean displayImage) {
    this.displayImage = displayImage;
  }

  public String getImageName() {
    return imageName;
  }

  public void setImageName(String imageName) {
    this.imageName = imageName;
  }


  @Override
  public String toString() {
    final StringBuilder sb = new StringBuilder("Card{");
    sb.append("id='").append(id).append('\'');
    sb.append(", name='").append(name).append('\'');
    sb.append(", displayImage=").append(displayImage);
    sb.append(", imageName='").append(imageName).append('\'');
    sb.append('}');
    return sb.toString();
  }
}
