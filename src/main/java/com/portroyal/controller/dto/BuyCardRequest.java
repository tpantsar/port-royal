package com.portroyal.controller.dto;

/* A request DTO (Data Transfer Object) that matches the structure of the incoming JSON */
public class BuyCardRequest {

  private int playerId;
  private int cardId;

  public int getPlayerId() {
    return playerId;
  }

  public void setPlayerId(int playerId) {
    this.playerId = playerId;
  }

  public int getCardId() {
    return cardId;
  }

  public void setCardId(int cardId) {
    this.cardId = cardId;
  }
}
