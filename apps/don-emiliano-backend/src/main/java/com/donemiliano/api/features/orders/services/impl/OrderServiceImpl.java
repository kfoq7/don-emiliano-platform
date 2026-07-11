package com.donemiliano.api.features.orders.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.donemiliano.api.features.core.exception.exceptions.BadRequestException;
import com.donemiliano.api.features.core.exception.exceptions.NotFoundException;
import com.donemiliano.api.features.orders.constants.OrderStatus;
import com.donemiliano.api.features.orders.dtos.CreateOrderDto;
import com.donemiliano.api.features.orders.dtos.OrderDto;
import com.donemiliano.api.features.orders.dtos.PaymentOrderUpdateDto;
import com.donemiliano.api.features.orders.dtos.response.OrderResponse;
import com.donemiliano.api.features.orders.dtos.resquest.OrderPaymentRequest;
import com.donemiliano.api.features.orders.entities.OrderEntity;
import com.donemiliano.api.features.orders.entities.OrderItemsEntity;
import com.donemiliano.api.features.orders.mappers.OrderMapper;
import com.donemiliano.api.features.orders.repositories.OrderRepository;
import com.donemiliano.api.features.orders.services.OrderService;
import com.donemiliano.api.features.payments.entities.PaymentEntity;
import com.donemiliano.api.features.payments.service.PaymentService;
import com.donemiliano.api.features.products.entities.ProductEntity;
import com.donemiliano.api.features.products.servicies.ProductService;
import com.donemiliano.api.features.tables.entity.TableEntity;
import com.donemiliano.api.features.tables.service.TableService;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final OrderMapper orderMapper;

    private final ProductService productService;

    private final TableService tableService;

    private final PaymentService paymentService;

    @Override
    public List<OrderDto> getAllOrderByDate(LocalDateTime date) {
        return orderRepository.findByCreatedAt(date).stream()
                .map(orderMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public OrderDto createOrder(CreateOrderDto order) {
        TableEntity tableEntity = tableService.validIsActiveTableOrCreate(order.tableRequest());

        Set<Long> productIds = order.orderItems().stream()
                .map(item -> item.getProductId())
                .collect(Collectors.toSet());

        Map<Long, ProductEntity> productsMap = productService.getAllProductsById(productIds).stream()
                .collect(Collectors.toMap(ProductEntity::getId, p -> p));

        OrderEntity orderEntity = orderMapper.toCreateEntity(order);

        List<OrderItemsEntity> orderItems = order.orderItems().stream()
                .map(item -> {
                    ProductEntity product = productsMap.get(item.getProductId());

                    if (product == null) {
                        throw new EntityNotFoundException("Product with id " + item.getProductId() + " not found");
                    }

                    Double subtotal = product.getPrice() * Double.valueOf(item.getQuantity());

                    OrderItemsEntity itemsEntity = OrderItemsEntity.builder()
                            .subtotal(subtotal)
                            .quantity(item.getQuantity())
                            .order(orderEntity)
                            .product(product)
                            .build();

                    return itemsEntity;
                })
                .toList();

        orderEntity.setOrderItems(orderItems);
        orderEntity.setTable(tableEntity);

        Double total = orderItems.stream()
                .map(item -> item.getSubtotal())
                .reduce(0.0, Double::sum);
        orderEntity.setTotalPrice(total);

        OrderEntity savedOrder = orderRepository.save(orderEntity);
        return orderMapper.toDto(savedOrder);
    }

    @Override
    public OrderResponse closeOrderPayment(OrderPaymentRequest request) {
        OrderEntity orderToClose = orderRepository.findById(request.orderId())
                .orElseThrow(() -> new NotFoundException("Order doesn't exists"));

        Double paymentAmount = request.paymentAmount();
        Double totalPrice = orderToClose.getTotalPrice();

        if (paymentAmount < totalPrice) {
            throw new BadRequestException("Payment amount is not valid");
        }

        Double amountDiff = paymentAmount - totalPrice;
        if (amountDiff > 0) {

        } else {

        }

        PaymentEntity paymentEntity = paymentService.getPayment(request.paymentId());

        orderMapper.updateEntityFromDto(orderToClose, PaymentOrderUpdateDto.builder()
                .orderStatus(OrderStatus.CLOSED)
                .paymentEntity(paymentEntity)
                .build());

        OrderEntity orderClosed = orderRepository.save(orderToClose);
        return orderMapper.toResponse(orderClosed);
    }
}
