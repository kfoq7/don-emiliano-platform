package com.donemiliano.api.features.products.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UpdateProductStockAvailableDto {

  @NotNull(message = "{validation.product.isStockAvailable}")
  @JsonProperty("isStockAvailable")
  private Boolean isStockAvailable;

}
