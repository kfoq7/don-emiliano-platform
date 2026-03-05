package com.donemiliano.api.features.products.dto;

import jakarta.validation.constraints.AssertTrue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCategoryDto extends CreateCategoryDto {

  @AssertTrue(message = "{validation.category.isActive}")
  private Boolean isActive;

}
