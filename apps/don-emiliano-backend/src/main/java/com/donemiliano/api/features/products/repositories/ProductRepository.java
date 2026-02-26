package com.donemiliano.api.features.products.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.donemiliano.api.features.products.entities.ProductEntity;

public interface ProductRepository
    extends JpaRepository<ProductEntity, Long>, JpaSpecificationExecutor<ProductEntity> {

  @Override
  @EntityGraph(attributePaths = { "category" })
  List<ProductEntity> findAll();

}
