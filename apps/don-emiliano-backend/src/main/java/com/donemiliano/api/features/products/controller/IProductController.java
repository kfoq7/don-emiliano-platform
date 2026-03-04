package com.donemiliano.api.features.products.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.dto.CategoryWithProductsDto;
import com.donemiliano.api.features.products.dto.CreateCategoryDto;
import com.donemiliano.api.features.products.dto.CreateProductDto;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.dto.ProductWithCategoryDto;
import com.donemiliano.api.features.products.dto.UpdateProductDto;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;

public interface IProductController {

  @GetMapping
  public ResponseEntity<List<ProductWithCategoryDto>> getAllProducts();

  @GetMapping("/category")
  public ResponseEntity<List<CategoryDto>> getAllCategories();

  @GetMapping("/by-category")
  public ResponseEntity<List<CategoryWithProductsDto>> getAllCategoriesWithProducts();

  @PostMapping
  public ResponseEntity<ProductDto> createProduct(@Valid() @RequestBody() CreateProductDto product);

  @PostMapping("/category")
  public ResponseEntity<CategoryDto> createCategory(@Valid() @RequestBody() CreateCategoryDto category);

  @PutMapping("/{id}")
  public ResponseEntity<ProductDto> updateProduct(
      @Parameter(required = true) @PathVariable(name = "id") Long id,
      @Valid() @RequestBody() UpdateProductDto product);

}
