package com.donemiliano.api.features.products.servicies;

import java.util.List;

import com.donemiliano.api.features.products.dto.CategoryDto;

public interface ICategoryService {

  List<CategoryDto> getAllCategories();

}
