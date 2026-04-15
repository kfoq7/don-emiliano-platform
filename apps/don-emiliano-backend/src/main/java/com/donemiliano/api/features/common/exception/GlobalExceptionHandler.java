package com.donemiliano.api.features.common.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.donemiliano.api.features.common.exception.exceptions.MethodArgumentNotValidException;
import com.donemiliano.api.features.common.exception.exceptions.ResourceNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler extends RuntimeException {

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, String>> handleException(Exception e) {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Internal Server Error: " + e.getMessage());
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
    Map<String, String> response = new HashMap<>();
    response.put("error", "Bad Request: " + e.getMessage());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleResourceNotFoundException(Exception e) {
    Map<String, String> response = new HashMap<>();
    response.put("error", e.getMessage());
    return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
  }

}
