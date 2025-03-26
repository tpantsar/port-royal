package com.portroyal.service.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    final String frontendUrl = "http://localhost:5173";
    final String backendUrl = "http://localhost:8080";

    registry.addMapping("/api/**") // Allow CORS on the `/api` path
        .allowedOrigins(frontendUrl, backendUrl) // Allow requests from frontend running on Vite
        .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow these HTTP methods
        .allowedHeaders("*") // Allow all headers
        .allowCredentials(true); // Allow sending cookies and authorization headers
  }
}

