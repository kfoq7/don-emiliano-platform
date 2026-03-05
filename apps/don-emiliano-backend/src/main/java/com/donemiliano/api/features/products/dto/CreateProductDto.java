package com.donemiliano.api.features.products.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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

  @Positive(message = "{validation.product.price.notBlank}")
  @NotNull(message = "{validation.product.price.size}")
  private Float price;

  @NotNull(message = "{validation.product.categoryId}")
  @Positive(message = "{validation.product.categoryId}")
  private Long categoryId;

  private Boolean isAvailable = true;

  private Boolean isStockAvailable = true;

}
