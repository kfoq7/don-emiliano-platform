package com.donemiliano.api.features.payments.service;

import java.util.List;

import com.donemiliano.api.features.payments.dto.request.PaymentOrderRequest;
import com.donemiliano.api.features.payments.dto.response.PaymentMethodResponse;
import com.donemiliano.api.features.payments.dto.response.PaymentResponse;
import com.donemiliano.api.features.payments.entities.PaymentEntity;
import com.donemiliano.api.features.payments.entities.PaymentMethodEntity;

public interface PaymentService {

    List<PaymentResponse> getAllPayments();

    PaymentEntity getPaymentReference(Long id);

    PaymentMethodEntity getPaymentMethodReference(Long id);

    List<PaymentMethodResponse> getAllPaymentMethod();

    PaymentResponse processPayment(Long orderId, PaymentOrderRequest paymentOrderRequest);

}
