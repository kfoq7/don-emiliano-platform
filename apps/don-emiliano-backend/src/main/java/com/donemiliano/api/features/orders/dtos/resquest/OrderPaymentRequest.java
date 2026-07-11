package com.donemiliano.api.features.orders.dtos.resquest;

public record OrderPaymentRequest(
        Long orderId,
        Long paymentId,
        Double paymentAmount) {
}
