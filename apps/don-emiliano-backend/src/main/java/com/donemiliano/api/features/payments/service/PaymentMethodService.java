package com.donemiliano.api.features.payments.service;

import java.util.List;

import com.donemiliano.api.features.payments.dto.response.PaymentMethodResponse;
import com.donemiliano.api.features.payments.entities.PaymentMethodEntity;

public interface PaymentMethodService {

    List<PaymentMethodResponse> getAllPaymentMethod();

    PaymentMethodEntity getPaymentMethodEntity(Long id);

}
