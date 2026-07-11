package com.donemiliano.api.features.orders.dtos;

import com.donemiliano.api.features.orders.constants.OrderStatus;
import com.donemiliano.api.features.payments.entities.PaymentEntity;

import lombok.Builder;

@Builder
public record PaymentOrderUpdateDto(
        Long tableNumber,
        Long paymentId,
        OrderStatus orderStatus,
        PaymentEntity paymentEntity) {
}
