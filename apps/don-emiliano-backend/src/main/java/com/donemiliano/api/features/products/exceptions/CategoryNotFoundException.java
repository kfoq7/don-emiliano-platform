package com.donemiliano.api.features.products.exceptions;

import com.donemiliano.api.features.core.exception.exceptions.NotFoundException;

public class CategoryNotFoundException extends NotFoundException {

    public CategoryNotFoundException() {
        super("Category not found");
    }

}
