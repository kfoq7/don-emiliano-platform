package com.donemiliano.api.features.products.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.donemiliano.api.features.products.entities.ProductEntity;

public interface ProductRepository
    extends JpaRepository<ProductEntity, Long>, JpaSpecificationExecutor<ProductEntity> {

  @EntityGraph(attributePaths = { "category" })
  @Query("SELECT p FROM ProductEntity p")
  List<ProductEntity> findAllWithCategory();

  @EntityGraph(attributePaths = { "category" })
  @Query("SELECT p FROM ProductEntity p WHERE p.id = :id")
  Optional<ProductEntity> findWithCategoryById(Long id);

}
