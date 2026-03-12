package com.donemiliano.api.features.users.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class CreateUserDto {

  @Size(max = 40, message = "{valitation.user.name.size}")
  private String name;

  @Size(max = 50, message = "{valitation.user.name.size}")
  private String lastName;

  @Email
  private String email;

  @Size(min = 6, message = "{valitation.user.password.size}")
  private String password;

}
