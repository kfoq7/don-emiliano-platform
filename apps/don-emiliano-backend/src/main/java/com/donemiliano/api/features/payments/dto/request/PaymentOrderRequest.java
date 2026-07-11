package com.donemiliano.api.features.payments.dto.request;

public record PaymentOrderRequest(
        Long paymentMethodId,
        Double paymentAmount,
        Double tips) {
}
