package com.donemiliano.api.features.orders.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.donemiliano.api.features.orders.entities.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long>, JpaSpecificationExecutor<OrderEntity> {

  @EntityGraph(attributePaths = { "orderItems" })
  List<OrderEntity> findByCreatedAt(LocalDateTime date);

  @EntityGraph(attributePaths = { "orderItems" })
  @Query("SELECT o FROM orders o WHERE o.created_at = CURRENT_DATE")
  List<OrderEntity> findAllByOrderToday();

}
