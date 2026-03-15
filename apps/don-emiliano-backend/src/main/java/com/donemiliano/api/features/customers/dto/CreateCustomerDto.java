package com.donemiliano.api.features.customers.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class CreateCustomerDto {

  @Size(max = 50, message = "{valitation.customer.name.size}")
  private String name;

  @Size(max = 50, message = "{valitation.customer.name.size}")
  private String lastName;

  @NotNull(message = "{valitation.customer.name.notNull}")
  private String phone;

  @Email
  private String email;

}
