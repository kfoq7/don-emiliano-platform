package com.donemiliano.api.features.products.servicies;

import java.util.List;

import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.dto.CreateCategoryDto;

public interface ICategoryService {

  List<CategoryDto> getAllCategories();

  CategoryDto createCategory(CreateCategoryDto createCategoryDto);

}
