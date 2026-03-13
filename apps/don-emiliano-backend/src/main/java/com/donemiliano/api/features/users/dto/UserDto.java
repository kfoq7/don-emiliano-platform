package com.donemiliano.api.features.users.dto;

import java.util.Set;

import com.donemiliano.api.features.roles.dto.RoleDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UserDto {

  private Long id;

  private String name;

  private String lastName;

  private Number phone;

  private String email;

  private Boolean isActive;

  private Set<RoleDto> roles;

}
