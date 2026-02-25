package com.donemiliano.api.features.products.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.donemiliano.api.features.products.dto.ProductDto;

public interface IProductController {

  @GetMapping
  public ResponseEntity<List<ProductDto>> getAllProducts();

}
