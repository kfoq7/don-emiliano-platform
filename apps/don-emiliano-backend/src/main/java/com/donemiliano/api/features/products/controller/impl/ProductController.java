package com.donemiliano.api.features.products.controller.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donemiliano.api.features.products.controller.IProductController;
import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.dto.CategoryWithProductsDto;
import com.donemiliano.api.features.products.dto.CreateCategoryDto;
import com.donemiliano.api.features.products.dto.CreateProductDto;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.dto.ProductWithCategoryDto;
import com.donemiliano.api.features.products.dto.UpdateProductDto;
import com.donemiliano.api.features.products.servicies.IProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController implements IProductController {

  private final IProductService productService;

  @Override
  public ResponseEntity<List<ProductWithCategoryDto>> getAllProducts() {
    return ResponseEntity.ok(productService.getAllProducts());
  }

  @Override
  public ResponseEntity<List<CategoryDto>> getAllCategories() {
    return ResponseEntity.ok(productService.getAllCategories());
  }

  @Override
  public ResponseEntity<List<CategoryWithProductsDto>> getAllCategoriesWithProducts() {
    return ResponseEntity.ok(productService.getAllCategoriesWithProducts());
  }

  @Override
  public ResponseEntity<ProductDto> createProduct(CreateProductDto productDto) {
    return ResponseEntity.ok(productService.createProduct(productDto));
  }

  @Override
  public ResponseEntity<CategoryDto> createCategory(CreateCategoryDto category) {
    return ResponseEntity.ok(productService.createCategory(category));
  }

  @Override
  public ResponseEntity<ProductDto> updateProduct(Long id, UpdateProductDto product) {
    return ResponseEntity.ok(productService.updateProduct(id, product));
  }

  @Override
  public ResponseEntity<CategoryDto> updateCategory(Long id, CreateCategoryDto category) {
    return ResponseEntity.ok(productService.updateCategory(id, category));
  }

}
