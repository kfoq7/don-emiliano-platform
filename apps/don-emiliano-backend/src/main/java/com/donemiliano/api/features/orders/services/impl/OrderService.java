package com.donemiliano.api.features.orders.services.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.donemiliano.api.features.orders.entities.OrderEntity;
import com.donemiliano.api.features.orders.repositories.OrderRepository;
import com.donemiliano.api.features.orders.services.IOrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {

  private final OrderRepository orderRepository;

  @Override
  public List<OrderEntity> getAllOrderByDate(LocalDateTime date) {
    return orderRepository.findByCreatedAt(date);
  }

}
