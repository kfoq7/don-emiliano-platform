package com.donemiliano.api.features.products.servicies.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.donemiliano.api.features.core.exception.exceptions.NotFoundException;
import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.dto.CategoryWithProductsDto;
import com.donemiliano.api.features.products.dto.CreateCategoryDto;
import com.donemiliano.api.features.products.dto.CreateProductDto;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.dto.ProductWithCategoryDto;
import com.donemiliano.api.features.products.dto.UpdateProductDto;
import com.donemiliano.api.features.products.dto.UpdateProductStockAvailableDto;
import com.donemiliano.api.features.products.entities.CategoryEntity;
import com.donemiliano.api.features.products.entities.ProductEntity;
import com.donemiliano.api.features.products.mappers.CategoryMapper;
import com.donemiliano.api.features.products.mappers.ProductMapper;
import com.donemiliano.api.features.products.repositories.CategoryRepository;
import com.donemiliano.api.features.products.repositories.ProductRepository;
import com.donemiliano.api.features.products.servicies.ProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final CategoryRepository categoryRepository;

    private final ProductMapper productMapper;

    private final CategoryMapper categoryMapper;

    @Override
    @Transactional(readOnly = true)
    public List<ProductWithCategoryDto> getAllProducts() {
        return productRepository.findAllWithCategory().stream()
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
    public List<ProductEntity> getAllProductsById(Iterable<Long> ids) {
        return productRepository.findAllById(ids);
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
                .orElseThrow(() -> new NotFoundException("Category not found"));

        ProductEntity product = productMapper.toCreateEntity(createProductDto);
        product.setCategory(category);
        ProductEntity savedProduct = productRepository.save(product);

        return productMapper.toDto(savedProduct);
    }

    @Override
    @Transactional
    public CategoryDto createCategory(CreateCategoryDto createCategoryDto) {
        CategoryEntity category = categoryMapper.toCreateEntity(createCategoryDto);
        CategoryEntity savedCategory = categoryRepository.save(category);

        return categoryMapper.toDto(savedCategory);
    }

    @Override
    @Transactional
    public ProductDto updateProduct(Long id, UpdateProductDto updateProductDto) {
        ProductEntity product = productRepository.findWithCategoryById(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));

        if (updateProductDto.categoryId() != null) {
            CategoryEntity category = categoryRepository.findById(updateProductDto.categoryId())
                    .orElseThrow(() -> new NotFoundException());
            product.setCategory(category);
        }

        productMapper.updateEntityFromDto(product, updateProductDto);
        ProductEntity updatedProduct = productRepository.save(product);

        return productMapper.toDto(updatedProduct);
    }

    @Override
    @Transactional
    public CategoryDto updateCategory(Long id, CreateCategoryDto createCategoryDto) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));

        categoryMapper.updateEntityFromDto(category, createCategoryDto);
        CategoryEntity updatedCategory = categoryRepository.save(category);

        return categoryMapper.toDto(updatedCategory);
    }

    @Override
    @Transactional
    public ProductDto updateProductAvailability(Long id, UpdateProductStockAvailableDto updateProductDto) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException());

        product.setIsStockAvailable(updateProductDto.getIsStockAvailable());
        ProductEntity updatedProduct = productRepository.save(product);

        return productMapper.toDto(updatedProduct);
    }

}
