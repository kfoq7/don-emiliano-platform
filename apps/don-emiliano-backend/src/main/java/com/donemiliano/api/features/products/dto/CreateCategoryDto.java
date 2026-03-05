package com.donemiliano.api.features.products.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateCategoryDto {

  @NotBlank(message = "{validation.category.name.notBlank}")
  @Size(min = 1, max = 50, message = "{validation.category.name.size}")
  private String name;

  @NotBlank(message = "{validation.category.description.notBlank}")
  @Size(min = 1, max = 255, message = "{validation.category.description.size}")
  private String description;

}
