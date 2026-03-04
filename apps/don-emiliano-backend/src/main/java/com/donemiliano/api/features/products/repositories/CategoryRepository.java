package com.donemiliano.api.features.products.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.donemiliano.api.features.products.entities.CategoryEntity;

public interface CategoryRepository
    extends JpaRepository<CategoryEntity, Long>, JpaSpecificationExecutor<CategoryEntity> {

  @EntityGraph(attributePaths = { "products" })
  @Query("SELECT c FROM CategoryEntity c")
  public List<CategoryEntity> findAllWithProducts();

}
