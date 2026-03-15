package com.donemiliano.api.features.customers.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain = true)
public class UpdateCustomerDto {

  @Size(max = 40, message = "{valitation.customer.name.size}")
  private String name;

  @Size(max = 50, message = "{valitation.customer.name.size}")
  private String lastName;

  @Size(max = 20)
  private String phone;

  @Email
  @Size(max = 100, message = "{valitation.customer.email.size}")
  private String email;

}
