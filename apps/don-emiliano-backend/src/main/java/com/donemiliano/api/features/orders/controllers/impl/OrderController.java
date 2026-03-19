package com.donemiliano.api.features.orders.controllers.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donemiliano.api.features.orders.controllers.IOrderController;
import com.donemiliano.api.features.orders.dtos.CreateOrderDto;
import com.donemiliano.api.features.orders.dtos.OrderDto;
import com.donemiliano.api.features.orders.services.IOrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController implements IOrderController {

  private final IOrderService orderService;

  @Override
  public ResponseEntity<List<OrderDto>> getAllOrderByDate(LocalDateTime date) {
    return ResponseEntity.ok(orderService.getAllOrderByDate(date));
  }

  @Override
  public ResponseEntity<OrderDto> createOrder(CreateOrderDto order) {
    // TODO Auto-generated method stub
    return null;
  }

}
