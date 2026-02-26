package com.donemiliano.api.features.products.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.dto.CreateCategoryDto;
import com.donemiliano.api.features.products.dto.CreateProductDto;
import com.donemiliano.api.features.products.dto.ProductDto;

import jakarta.validation.Valid;

public interface IProductController {

  @GetMapping
  public ResponseEntity<List<ProductDto>> getAllProducts();

  @PostMapping
  ResponseEntity<ProductDto> createProduct(
      @Valid() @RequestBody() CreateProductDto product);

  @PostMapping("/category")
  ResponseEntity<CategoryDto> createCategory(
      @Valid() @RequestBody() CreateCategoryDto category);

}
