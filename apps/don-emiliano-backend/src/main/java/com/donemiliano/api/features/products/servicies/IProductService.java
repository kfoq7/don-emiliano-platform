package com.donemiliano.api.features.products.servicies;

import java.util.List;

import com.donemiliano.api.features.products.dto.CategoryWithProductsDto;
import com.donemiliano.api.features.products.dto.CreateProductDto;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.dto.ProductWithCategoryDto;
import com.donemiliano.api.features.products.dto.UpdateProductDto;

public interface IProductService extends ICategoryService {

  List<ProductWithCategoryDto> getAllProducts();

  List<CategoryWithProductsDto> getAllCategoriesWithProducts();

  ProductDto createProduct(CreateProductDto createProductDto);

  ProductDto updateProduct(Long id, UpdateProductDto createProductDto);

}
