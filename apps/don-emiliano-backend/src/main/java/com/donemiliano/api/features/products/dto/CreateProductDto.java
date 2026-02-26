package com.donemiliano.api.features.products.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Accessors(chain = true)
public class CreateProductDto {

  @NotBlank(message = "{valitation.product.name.notBlank}")
  @Size(min = 1, max = 50, message = "{validation.product.name.size}")
  private String name;

  @NotBlank(message = "{validation.product.description.notBlank}")
  @Size(min = 1, max = 255, message = "{validation.product.description.size}")
  private String description;

  @NotBlank(message = "{validation.product.price.notBlank}")
  @Size(min = 1, message = "{validation.product.price.size}")
  private Double price;

  private Long categoryId;

}
