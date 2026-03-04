package com.donemiliano.api.features.products.dto;

import jakarta.validation.constraints.AssertTrue;
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
@ToString
@Accessors(chain = true)
public class UpdateProductDto extends CreateProductDto {

  @AssertTrue(message = "{validation.product.isActive}")
  private Boolean isActive;

}
