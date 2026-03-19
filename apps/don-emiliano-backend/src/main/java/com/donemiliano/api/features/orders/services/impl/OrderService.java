package com.donemiliano.api.features.orders.services.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.donemiliano.api.features.orders.dtos.CreateOrderDto;
import com.donemiliano.api.features.orders.dtos.OrderDto;
import com.donemiliano.api.features.orders.entities.OrderEntity;
import com.donemiliano.api.features.orders.entities.OrderItemsEntity;
import com.donemiliano.api.features.orders.mappers.IOrderMapper;
import com.donemiliano.api.features.orders.repositories.OrderRepository;
import com.donemiliano.api.features.orders.services.IOrderService;
import com.donemiliano.api.features.products.entities.ProductEntity;
import com.donemiliano.api.features.products.servicies.IProductService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {

  private final OrderRepository orderRepository;
  private final IOrderMapper orderMapper;
  private final IProductService productService;

  @Override
  public List<OrderDto> getAllOrderByDate(LocalDateTime date) {
    return orderRepository.findByCreatedAt(date).stream()
        .map(orderMapper::toDto)
        .toList();
  }

  @Override
  @Transactional
  public OrderDto createOrder(CreateOrderDto order) {
    Set<Long> productIds = order.getOrderItems().stream()
        .map(item -> item.getProductId())
        .collect(Collectors.toSet());

    Map<Long, ProductEntity> productsMap = productService.getAllProductsById(productIds).stream()
        .collect(Collectors.toMap(ProductEntity::getId, p -> p));

    OrderEntity orderEntity = orderMapper.toCreateEntity(order);

    List<OrderItemsEntity> orderItems = order.getOrderItems().stream()
        .map(item -> {
          ProductEntity product = productsMap.get(item.getProductId());

          if (product == null) {
            throw new EntityNotFoundException("Product with id " + item.getProductId() + " not found");
          }

          BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));

          OrderItemsEntity itemsEntity = OrderItemsEntity.builder()
              .subtotal(subtotal)
              .quantity(item.getQuantity())
              .product(product)
              .build();

          itemsEntity.setOrder(orderEntity);
          return itemsEntity;
        })
        .toList();

    orderEntity.setOrderItems(orderItems);

    BigDecimal total = orderItems.stream()
        .map(item -> item.getSubtotal())
        .reduce(BigDecimal.ZERO, BigDecimal::add);
    orderEntity.setTotalPrice(total);

    OrderEntity savedOrder = orderRepository.save(orderEntity);
    return orderMapper.toDto(savedOrder);
  }

}
