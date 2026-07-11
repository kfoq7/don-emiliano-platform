package com.donemiliano.api.features.payments.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.donemiliano.api.features.payments.dto.request.PaymentOrderRequest;
import com.donemiliano.api.features.payments.dto.response.PaymentResponse;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

public interface PaymentController {

    @GetMapping
    ResponseEntity<List<PaymentResponse>> getAllPayments();

    @PostMapping("/order/{orderId}")
    ResponseEntity<PaymentResponse> processOrderPayment(
            @PathVariable Long orderId,
            @RequestBody PaymentOrderRequest orderRequest);

}
