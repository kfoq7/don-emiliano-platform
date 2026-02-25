package com.donemiliano.api.features.products.controller.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donemiliano.api.features.products.controller.IProductController;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.servicies.IProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductControllerImp implements IProductController {

  private final IProductService productService;

  @Override
  public ResponseEntity<List<ProductDto>> getAllProducts() {
    return ResponseEntity.ok(productService.getAllProducts());
  }

}
