package com.donemiliano.api.features.products.servicies;

import java.util.List;

import com.donemiliano.api.features.products.dto.ProductDto;

public interface IProductService {

  List<ProductDto> getAllProducts();

}
