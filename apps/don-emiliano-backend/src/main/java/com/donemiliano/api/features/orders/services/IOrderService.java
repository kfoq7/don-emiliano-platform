package com.donemiliano.api.features.orders.services;

import java.time.LocalDateTime;
import java.util.List;

import com.donemiliano.api.features.orders.dtos.CreateOrderDto;
import com.donemiliano.api.features.orders.dtos.OrderDto;

public interface IOrderService {

  List<OrderDto> getAllOrderByDate(LocalDateTime date);

  OrderDto createOrder(CreateOrderDto order);

}
