package com.donemiliano.api.features.customers.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class CustomerDto {

  private Long id;

  private String name;

  private String lastName;

  private String phone;

  private String email;

  private Boolean isActive;

}
