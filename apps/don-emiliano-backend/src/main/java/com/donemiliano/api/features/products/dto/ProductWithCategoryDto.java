package com.donemiliano.api.features.products.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@ToString()
@Accessors(chain = true)
public class ProductWithCategoryDto extends ProductDto {

  private CategoryDto category;

}
