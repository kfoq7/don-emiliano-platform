package com.donemiliano.api.features.products.servicies.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.dto.CategoryWithProductsDto;
import com.donemiliano.api.features.products.dto.CreateCategoryDto;
import com.donemiliano.api.features.products.dto.CreateProductDto;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.dto.ProductWithCategoryDto;
import com.donemiliano.api.features.products.dto.UpdateProductDto;
import com.donemiliano.api.features.products.entities.CategoryEntity;
import com.donemiliano.api.features.products.entities.ProductEntity;
import com.donemiliano.api.features.products.mappers.ICategoryMapper;
import com.donemiliano.api.features.products.mappers.IProductMapper;
import com.donemiliano.api.features.products.repositories.CategoryRepository;
import com.donemiliano.api.features.products.repositories.ProductRepository;
import com.donemiliano.api.features.products.servicies.IProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

  private final ProductRepository productRepository;
  private final CategoryRepository categoryRepository;
  private final IProductMapper productMapper;
  private final ICategoryMapper categoryMapper;

  @Override
  @Transactional(readOnly = true)
  public List<ProductWithCategoryDto> getAllProducts() {
    return productRepository.findAll().stream()
        .map(productMapper::toDtoWithCategory)
        .toList();
  }

  @Override
  public List<CategoryDto> getAllCategories() {
    return categoryRepository.findAll().stream()
        .map(categoryMapper::toDto)
        .toList();
  }

  @Override
  @Transactional(readOnly = true)
  public List<CategoryWithProductsDto> getAllCategoriesWithProducts() {
    return categoryRepository.findAllWithProducts().stream()
        .map(categoryMapper::toDtoWithProducts)
        .toList();
  }

  @Override
  @Transactional
  public ProductDto createProduct(CreateProductDto createProductDto) {
    CategoryEntity category = categoryRepository.findById(createProductDto.getCategoryId())
        .orElseThrow(() -> new RuntimeException("Category not found"));

    ProductEntity product = productMapper.toCreateEntity(createProductDto);
    product.setCategory(category);
    ProductEntity savedProduct = productRepository.save(product);

    return productMapper.toDtoWithCategory(savedProduct);
  }

  @Override
  public CategoryDto createCategory(CreateCategoryDto createCategoryDto) {
    CategoryEntity category = categoryMapper.toCreateEntity(createCategoryDto);
    CategoryEntity savedCategory = categoryRepository.save(category);

    return categoryMapper.toDto(savedCategory);
  }

  @Override
  @Transactional
  public ProductDto updateProduct(Long id, UpdateProductDto updateProductDto) {
    ProductEntity product = productRepository.findWithCategoryById(id)
        .orElseThrow(() -> new RuntimeException("Product not found"));

    if (updateProductDto.getCategoryId() != null) {
      CategoryEntity category = categoryRepository.findById(updateProductDto.getCategoryId())
          .orElseThrow(() -> new RuntimeException("Category not found"));
      product.setCategory(category);
    }

    productMapper.updateEntityFromDto(product, updateProductDto);
    ProductEntity updatedProduct = productRepository.save(product);

    return productMapper.toDtoWithCategory(updatedProduct);
  }

}
