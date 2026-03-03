package com.donemiliano.api.features.products.servicies;

import java.util.List;

import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.dto.CreateCategoryDto;

public interface ICategoryService {

  List<CategoryDto> getAllCategories();

  // CategoryDto getCategoryById(Long id);

  CategoryDto createCategory(CreateCategoryDto createCategoryDto);

}
