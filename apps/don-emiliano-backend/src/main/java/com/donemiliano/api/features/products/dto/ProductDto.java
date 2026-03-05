package com.donemiliano.api.features.products.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ProductDto {

  private Long id;

  private String name;

  private String description;

  private Float price;

  private Boolean isAvailable;

  private Boolean isStockAvailable;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

}
