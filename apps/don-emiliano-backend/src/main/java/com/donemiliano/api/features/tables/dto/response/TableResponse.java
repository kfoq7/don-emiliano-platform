package com.donemiliano.api.features.tables.dto.response;

import java.time.LocalDateTime;

public record TableResponse(
        Long id,
        String tableNumber,
        Boolean isCurrentActive,
        LocalDateTime createAt) {
}
