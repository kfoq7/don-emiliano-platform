package com.donemiliano.api.features.products.servicies.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.repositories.CategoryRepository;
import com.donemiliano.api.features.products.repositories.ProductRepository;
import com.donemiliano.api.features.products.servicies.ICategoryService;
import com.donemiliano.api.features.products.servicies.IProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService, ICategoryService {

  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;

  @Override
  public List<ProductDto> getAllProducts() {
    return productRepository.findAll().stream()
        .map(product -> new ProductDto(product.getId(), product.getName()))
        .toList();
  }

  @Override
  public List<CategoryDto> getAllCategories() {
    return categoryRepository.findAll().stream()
        .map(category -> new CategoryDto(
            category.getId(),
            category.getName(),
            category.getDescription(),
            category.getIsActive()))
        .toList();
  }

}
