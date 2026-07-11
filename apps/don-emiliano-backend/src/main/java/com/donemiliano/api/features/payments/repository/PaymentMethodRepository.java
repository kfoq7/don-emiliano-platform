package com.donemiliano.api.features.payments.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.donemiliano.api.features.payments.entities.PaymentEntity;
import com.donemiliano.api.features.payments.entities.PaymentMethodEntity;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethodEntity, Long> {

    List<PaymentEntity> findAllByIsActiveTrue();

}
