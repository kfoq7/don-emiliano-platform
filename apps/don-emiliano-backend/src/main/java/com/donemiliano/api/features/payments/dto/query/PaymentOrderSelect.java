package com.donemiliano.api.features.payments.dto.query;

public interface PaymentOrderSelect {

    Long getId();

    PaymentMethodOrderSelect getPaymentMethod();

}
