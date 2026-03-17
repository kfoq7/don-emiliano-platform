package com.donemiliano.api.features.orders.entities;

import org.checkerframework.checker.units.qual.C;

import com.donemiliano.api.features.products.entities.ProductEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "order_items")
@ToString
@Accessors(chain = true)
public class OrderItemsEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_items_id_seq")
  @SequenceGenerator(name = "order_items_id_seq", sequenceName = "order_items_id_seq", allocationSize = 1)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @Column(nullable = false)
  private Integer quantity;

  @Column(columnDefinition = "TEXT", nullable = true)
  private String notes;

  @Column(nullable = false)
  private Integer subtotal;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "order_id", nullable = false)
  private OrderEntity order;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", nullable = false)
  private ProductEntity product;

}
