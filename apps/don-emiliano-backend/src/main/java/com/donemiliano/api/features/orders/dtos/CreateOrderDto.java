package com.donemiliano.api.features.orders.dtos;

import java.util.List;

import com.donemiliano.api.features.tables.dto.request.ValidTableRequest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

// @Data
// @AllArgsConstructor
// @NoArgsConstructor
// @Accessors(chain = true)
// public class CreateOrderDto {
//
//     @NotNull(message = "Order number is required")
//     private Integer oderNumber;
//
//     private String observation;
//
//     @Valid
//     @NotEmpty(message = "List of order item cannot be empty")
//     @Size(min = 1, message = "At least one order item is required")
//     private List<CreateOrderItemsDto> orderItems;
//
//     @NotNull(message = "Table is required")
//     private Long tableId;
//
// }
//
public record CreateOrderDto(
        @NotNull Integer orderNumber,
        String observation,
        @Valid @NotEmpty(message = "List of order item cannot be empty") @Size(min = 1, message = "At least one order item is required") List<CreateOrderItemsDto> orderItems,
        ValidTableRequest tableRequest) {
}
