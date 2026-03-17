package com.donemiliano.api.features.orders.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class OrderDto {

  private Long id;

  private Integer orderNumber;

  private String observation;

  private List<OrderItemDto> orderItems;

}
