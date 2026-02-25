package com.donemiliano.api.features.products.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_id_seq")
  @SequenceGenerator(name = "product_id_seq", sequenceName = "product_id_seq", allocationSize = 1)
  @Column(name = "id", updatable = false, nullable = false)
  private Integer id;

  @Column(nullable = false)
  private String name;

  @Column(columnDefinition = "TEXT")
  private String description;

  @Column(nullable = false)
  private Double price;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id", nullable = false)
  private CategoryEntity category;

}
