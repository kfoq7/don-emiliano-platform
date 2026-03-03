package com.donemiliano.api.features.products.servicies.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.dto.CreateCategoryDto;
import com.donemiliano.api.features.products.dto.CreateProductDto;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.entities.CategoryEntity;
import com.donemiliano.api.features.products.entities.ProductEntity;
import com.donemiliano.api.features.products.mappers.IProductMapper;
import com.donemiliano.api.features.products.repositories.CategoryRepository;
import com.donemiliano.api.features.products.repositories.ProductRepository;
import com.donemiliano.api.features.products.servicies.IProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;
  private final IProductMapper productMapper;

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

  @Override
  public ProductDto createProduct(CreateProductDto createProductDto) {
    CategoryEntity category = categoryRepository.findById(createProductDto.getCategoryId())
        .orElseThrow(() -> new RuntimeException("Category not found"));

    ProductEntity product = productMapper.toCreateEntity(createProductDto);
    product.setCategory(category);
    productRepository.save(product);

    return productMapper.toDtoWithCategory(product);
  }

  @Override
  public CategoryDto createCategory(CreateCategoryDto createCategoryDto) {
    CategoryEntity category = CategoryEntity.builder()
        .name(createCategoryDto.getName())
        .description(createCategoryDto.getDescription())
        .isActive(true)
        .build();

    CategoryEntity savedCategory = categoryRepository.save(category);

    return new CategoryDto(
        savedCategory.getId(),
        savedCategory.getName(),
        savedCategory.getDescription(),
        savedCategory.getIsActive());
  }

}
