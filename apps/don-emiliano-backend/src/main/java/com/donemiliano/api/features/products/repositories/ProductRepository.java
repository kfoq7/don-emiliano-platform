package com.donemiliano.api.features.products.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.donemiliano.api.features.products.entities.ProductEntity;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

  @EntityGraph(attributePaths = { "category" })
  List<ProductEntity> findAll();

}
