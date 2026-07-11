package com.donemiliano.api.features.tables.dto.request;

public record TableUpdateRequest(
        Long tableId,
        String tableNumber) {
}
