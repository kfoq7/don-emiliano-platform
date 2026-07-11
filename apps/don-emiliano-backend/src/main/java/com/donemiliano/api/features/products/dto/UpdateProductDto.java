package com.donemiliano.api.features.products.dto;

import jakarta.validation.constraints.Size;

public record UpdateProductDto(
        @Size(max = 40, message = "This should less then 40 characteres") String name,
        @Size(max = 50, message = "") String lastName,
        @Size(max = 20, message = "") String phone,
        Long categoryId) {
}
