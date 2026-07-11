package com.donemiliano.api.features.payments.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.donemiliano.api.features.payments.dto.query.PaymentOrderSelect;
import com.donemiliano.api.features.payments.entities.PaymentEntity;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {

    @EntityGraph(attributePaths = { "paymentMethod" })
    @Query("SELECT p FROM PaymentEntity p WHERE p.id := id")
    PaymentOrderSelect findWithPaymentMethodById(Long id);

}
