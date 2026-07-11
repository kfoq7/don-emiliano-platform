package com.donemiliano.api.features.payments.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.donemiliano.api.features.core.exception.exceptions.BadRequestException;
import com.donemiliano.api.features.core.exception.exceptions.NotFoundException;
import com.donemiliano.api.features.orders.entities.OrderEntity;
import com.donemiliano.api.features.orders.repositories.OrderRepository;
import com.donemiliano.api.features.payments.dto.request.PaymentOrderRequest;
import com.donemiliano.api.features.payments.dto.response.PaymentMethodResponse;
import com.donemiliano.api.features.payments.dto.response.PaymentResponse;
import com.donemiliano.api.features.payments.entities.PaymentEntity;
import com.donemiliano.api.features.payments.entities.PaymentMethodEntity;
import com.donemiliano.api.features.payments.mappers.PaymentMapper;
import com.donemiliano.api.features.payments.mappers.PaymentMethodMapper;
import com.donemiliano.api.features.payments.repository.PaymentMethodRepository;
import com.donemiliano.api.features.payments.repository.PaymentRepository;
import com.donemiliano.api.features.payments.service.PaymentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymnentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    private final PaymentMethodRepository paymentMethodRepository;

    private final OrderRepository orderRepository;

    private final PaymentMapper paymentMapper;

    private final PaymentMethodMapper paymentMethodMapper;

    @Override
    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(paymentMapper::toResponse)
                .toList();
    }

    @Override
    public PaymentEntity getPaymentReference(Long id) {
        return paymentRepository.getReferenceById(id);
    }

    @Override
    public PaymentMethodEntity getPaymentMethodReference(Long id) {
        return paymentMethodRepository.getReferenceById(id);
    }

    @Override
    public List<PaymentMethodResponse> getAllPaymentMethod() {
        return paymentMethodRepository.findAllByIsActiveTrue().stream()
                .map(paymentMethodMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public PaymentResponse processPayment(Long orderId, PaymentOrderRequest paymentOrderRequest) {
        OrderEntity orderToClose = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order does not exists"));

        Double paymentAmount = paymentOrderRequest.paymentAmount();
        Double totalPrice = orderToClose.getTotalPrice();

        if (paymentAmount < totalPrice) {
            throw new BadRequestException("`Payment Amount` is not valid.");
        }

        PaymentMethodEntity paymentMethodEntity = paymentMethodRepository
                .findById(paymentOrderRequest.paymentMethodId())
                .orElseThrow(() -> new BadRequestException("Payment method not valid"));

        // Double paymentDiff = paymentAmount - totalPrice;

        PaymentEntity paymentSaved = paymentRepository.save(PaymentEntity.builder()
                .order(orderToClose)
                .paymentAmount(paymentAmount)
                .tips(paymentOrderRequest.tips())
                .paymentMethod(paymentMethodEntity)
                .build());

        return paymentMapper.toResponse(paymentSaved);
    }

}
