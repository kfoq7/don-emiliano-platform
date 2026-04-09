package com.donemiliano.api.features.products.servicies;

import java.util.List;

import com.donemiliano.api.features.products.dto.CategoryWithProductsDto;
import com.donemiliano.api.features.products.dto.CreateProductDto;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.dto.ProductWithCategoryDto;
import com.donemiliano.api.features.products.dto.UpdateProductDto;
import com.donemiliano.api.features.products.dto.UpdateProductStockAvailableDto;
import com.donemiliano.api.features.products.entities.ProductEntity;

public interface ProductService extends CategoryService {

  List<ProductWithCategoryDto> getAllProducts();

  List<CategoryWithProductsDto> getAllCategoriesWithProducts();

  List<ProductEntity> getAllProductsById(Iterable<Long> ids);

  ProductDto createProduct(CreateProductDto createProductDto);

  ProductDto updateProduct(Long id, UpdateProductDto createProductDto);

  ProductDto updateProductAvailability(Long id, UpdateProductStockAvailableDto updateProductDto);

}
