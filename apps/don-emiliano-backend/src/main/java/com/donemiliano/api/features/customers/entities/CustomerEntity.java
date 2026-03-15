package com.donemiliano.api.features.customers.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@Entity
@Builder
@Table(name = "customers")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain = true)
public class CustomerEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_id_seq")
  @SequenceGenerator(name = "customer_id_seq", sequenceName = "customer_id_seq", allocationSize = 1)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @Column(name = "first_name", nullable = true, columnDefinition = "TEXT")
  private String name;

  @Column(name = "last_name", nullable = true, columnDefinition = "TEXT")
  private String lastName;

  @Column(nullable = true, unique = true, columnDefinition = "TEXT")
  private String phone;

  @Column(nullable = true, unique = true, columnDefinition = "TEXT")
  private String email;

  @Column(name = "is_active", nullable = false)
  @Builder.Default
  private Boolean isActive = true;

}
