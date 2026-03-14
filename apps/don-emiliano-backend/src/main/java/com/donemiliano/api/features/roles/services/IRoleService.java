package com.donemiliano.api.features.roles.services;

import java.util.List;
import java.util.Set;

import com.donemiliano.api.features.roles.dto.CreateRoleDto;
import com.donemiliano.api.features.roles.dto.RoleDto;

public interface IRoleService {

  List<RoleDto> getAllRoles();

  List<RoleDto> getRolesByIds(Set<Long> ids);

  RoleDto getRoleById(Long id);

  RoleDto createRole(CreateRoleDto roleDto);

}
