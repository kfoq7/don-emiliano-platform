package com.donemiliano.api.features.core.exception.exceptions;

import org.springframework.http.HttpStatus;

import com.donemiliano.api.features.core.exception.base.BaseException;

public class BadRequestException extends BaseException {

    public BadRequestException(String message) {
        super(message, HttpStatus.BAD_REQUEST.value());
    }

}
