package com.donemiliano.api.features.orders.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class OrderItemDto {

  private Long id;

  private Integer quantity;

  private Integer subtotal;

}
