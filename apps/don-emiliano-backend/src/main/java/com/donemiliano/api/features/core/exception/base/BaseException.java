package com.donemiliano.api.features.core.exception.base;

import lombok.Getter;

@Getter
public abstract class BaseException extends RuntimeException {

    private final String message;

    private final int statusCode;

    private final Object[] args;

    protected BaseException(String message, int statusCode, Object... args) {
        this.message = message;
        this.statusCode = statusCode;
        this.args = args;
    }

}
