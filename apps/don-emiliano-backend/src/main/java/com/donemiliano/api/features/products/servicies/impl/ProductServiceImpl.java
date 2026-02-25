package com.donemiliano.api.features.products.servicies.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.repositories.ProductRepository;
import com.donemiliano.api.features.products.servicies.IProductService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

  private final ProductRepository productRepository;

  @Override
  public List<ProductDto> getAllProducts() {
    return productRepository.findAll().stream()
        .map(product -> new ProductDto(product.getId(), product.getName()))
        .toList();
  }

}
