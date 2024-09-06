package com.portroyal.controller.output;

import java.util.HashMap;
import java.util.Map;

public class ApiResponse<T> {

  private int statusCode;
  private String message;
  private T data;
  private Map<String, String> errors;

  // Default constructor
  public ApiResponse() {
  }

  // Constructor for successful response
  public ApiResponse(int statusCode, String message, T data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.errors = null;
  }

  // Constructor for failed response
  public ApiResponse(int statusCode, String message, Map<String, String> errors) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.errors = errors;
  }

  // Getters and Setters
  public int getStatusCode() {
    return statusCode;
  }

  public void setStatusCode(int statusCode) {
    this.statusCode = statusCode;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }

  public Map<String, String> getErrors() {
    return errors;
  }

  public void setErrors(Map<String, String> errors) {
    this.errors = errors;
  }

  // Static factory methods for easy creation of responses

  // For a successful response
  public static <T> ApiResponse<T> success(int statusCode, String message, T data) {
    return new ApiResponse<>(statusCode, message, data);
  }

  // For a failed response
  public static <T> ApiResponse<T> error(int statusCode, String message,
      Map<String, String> errors) {
    return new ApiResponse<>(statusCode, message, errors);
  }

  // For a failed response
  public static <T> ApiResponse<T> error(String message, Throwable throwable) {
    return new ApiResponse<>(500, message, Map.of("error", throwable.getMessage()));
  }

  // For a failed response with a single error message
  public static <T> ApiResponse<T> error(int statusCode, String message, String errorKey,
      String errorMessage) {
    Map<String, String> errors = new HashMap<>();
    errors.put(errorKey, errorMessage);
    return new ApiResponse<>(statusCode, message, errors);
  }
}
