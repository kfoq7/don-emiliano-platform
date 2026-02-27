package com.donemiliano.api.features.products.controller.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donemiliano.api.features.products.controller.IProductController;
import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.dto.CreateCategoryDto;
import com.donemiliano.api.features.products.dto.CreateProductDto;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.servicies.IProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController implements IProductController {

  private final IProductService productService;

  @Override
  public ResponseEntity<List<ProductDto>> getAllProducts() {
    return ResponseEntity.ok(productService.getAllProducts());
  }

  @Override
  public ResponseEntity<List<CategoryDto>> getAllCategories() {
    return ResponseEntity.ok(productService.getAllCategories());
  }

  @Override
  public ResponseEntity<ProductDto> createProduct(CreateProductDto productDto) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public ResponseEntity<CategoryDto> createCategory(CreateCategoryDto category) {
    return ResponseEntity.ok(productService.createCategory(category));
  }

}
