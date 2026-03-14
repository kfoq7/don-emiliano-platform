package com.donemiliano.api.features.users.dto;

import java.util.Set;

import com.donemiliano.api.features.roles.dto.RoleDto;

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
public class UserWithRolesDto {

  private Long id;

  private String name;

  private String lastName;

  private String phone;

  private String email;

  private Boolean isActive;

  private Set<RoleDto> roles;

}
