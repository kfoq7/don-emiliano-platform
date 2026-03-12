package com.donemiliano.api.features.products.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCategoryDto extends CreateCategoryDto {

  @NotNull(message = "{validation.category.isActive}")
  @JsonProperty("isActive")
  private Boolean isActive;

}
