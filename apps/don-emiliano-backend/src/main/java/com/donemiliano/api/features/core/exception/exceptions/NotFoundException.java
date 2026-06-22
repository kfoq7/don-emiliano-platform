package com.donemiliano.api.features.core.exception.exceptions;

import org.springframework.http.HttpStatus;

import com.donemiliano.api.features.core.exception.base.BaseException;

public class NotFoundException extends BaseException {

    public NotFoundException(Object... args) {
        super("Object or item was not found", HttpStatus.NOT_FOUND.value(), args);
    }

    public NotFoundException(String message, Object... args) {
        super(message, HttpStatus.NOT_FOUND.value(), args);
    }

}
