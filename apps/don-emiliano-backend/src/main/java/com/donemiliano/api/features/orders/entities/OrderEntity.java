package com.donemiliano.api.features.orders.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Entity
@Table(name = "orders")
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class OrderEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "order_id_seq")
  @SequenceGenerator(name = "order_id_seq", sequenceName = "order_id_seq", allocationSize = 1)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @Column(length = 8)
  private Integer orderNumber;

  @Column(columnDefinition = "TEXT")
  private String observation;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

}
