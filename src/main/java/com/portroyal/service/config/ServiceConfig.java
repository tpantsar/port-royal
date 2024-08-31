package com.portroyal.service.config;

import com.portroyal.model.GameState;
import com.portroyal.service.GameService;
import com.portroyal.service.GameSetupService;
import com.portroyal.service.impl.GameServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServiceConfig {

  @Bean
  public GameSetupService gameSetupService() {
    return new GameSetupService();
  }

  @Bean
  public GameService gameService(final GameState gameState) {
    return new GameServiceImpl(gameState);
  }

  @Bean
  public GameState gameState(GameSetupService gameSetupService) {
    return new GameState(gameSetupService);
  }
}
