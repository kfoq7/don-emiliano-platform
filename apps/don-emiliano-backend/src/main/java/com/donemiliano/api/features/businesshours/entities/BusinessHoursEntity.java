package com.donemiliano.api.features.businesshours.entities;

import java.time.LocalTime;
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
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "business_hours")
public class BusinessHoursEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "business_hours_id_seq")
  @SequenceGenerator(name = "business_hours_id_seq", sequenceName = "business_hours_id_seq", allocationSize = 1)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

  @Column(name = "day_of_week", nullable = false, unique = true)
  private Integer dayOfWeek;

  @Column(name = "day_name", nullable = false, length = 20)
  private String dayName;

  @Column(name = "open_time")
  private LocalTime openTime;

  @Column(name = "close_time")
  private LocalTime closeTime;

  @Column(name = "is_closed", nullable = false)
  @Builder.Default
  private Boolean isClosed = false;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

}
