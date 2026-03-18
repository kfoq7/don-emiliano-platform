package com.donemiliano.api.features.orders.services;

import java.time.LocalDateTime;
import java.util.List;

import com.donemiliano.api.features.orders.entities.OrderEntity;

public interface IOrderService {

  List<OrderEntity> getAllOrderByDate(LocalDateTime date);

}
