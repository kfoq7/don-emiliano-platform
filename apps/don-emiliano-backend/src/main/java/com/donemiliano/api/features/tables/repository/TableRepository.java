package com.donemiliano.api.features.tables.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.donemiliano.api.features.tables.entity.TableEntity;

@Repository
public interface TableRepository extends JpaRepository<TableEntity, Long> {

    Optional<TableEntity> findByIdAndIsActiveTrue(Long id);

}
