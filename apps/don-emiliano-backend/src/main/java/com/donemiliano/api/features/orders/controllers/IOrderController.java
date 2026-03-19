package com.donemiliano.api.features.orders.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.donemiliano.api.features.orders.dtos.CreateOrderDto;
import com.donemiliano.api.features.orders.dtos.OrderDto;

public interface IOrderController {

  @GetMapping
  public ResponseEntity<List<OrderDto>> getAllOrderByDate(@RequestParam LocalDateTime date);

  @PostMapping
  public ResponseEntity<OrderDto> createOrder(CreateOrderDto order);

}
