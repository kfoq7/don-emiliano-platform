package com.donemiliano.api.features.core.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.donemiliano.api.features.common.dtos.api.ApiErrorDto;
import com.donemiliano.api.features.core.exception.base.BaseException;

import lombok.RequiredArgsConstructor;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private void printError(Exception ex) {
        logger.error("An unexpected error occurred: {}", ex.getMessage(), ex);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorDto> handleException() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiErrorDto.builder()
                        .message("An unexpected error occurred")
                        .build());

    }

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ApiErrorDto> handleBaseException(BaseException ex) {
        int statusCode = ex.getStatusCode();

        printError(ex);

        return ResponseEntity.status(statusCode).body(
                ApiErrorDto.builder()
                        .message(ex.getMessage())
                        .status(statusCode)
                        .build());
    }

}
