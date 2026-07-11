package com.donemiliano.api.features.payments.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.donemiliano.api.features.payments.dto.PaymentMethods;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumeratedValue;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Entity
@Table(name = "payment_methods")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class PaymentMethodEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "payment_method_id_seq")
    @SequenceGenerator(name = "payment_method_id_seq", sequenceName = "payment_method_id_seq", allocationSize = 1)
    @Column(name = "payment_method_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private PaymentMethods name;

    @Column(length = 100)
    private String description;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

}
