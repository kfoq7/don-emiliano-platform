package com.donemiliano.api.features.roles.controller.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donemiliano.api.features.roles.controller.IRoleController;
import com.donemiliano.api.features.roles.dto.CreateRoleDto;
import com.donemiliano.api.features.roles.dto.RoleDto;
import com.donemiliano.api.features.roles.services.IRoleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController implements IRoleController {

  private final IRoleService roleService;

  @Override
  public ResponseEntity<List<RoleDto>> getAllRoles() {
    return ResponseEntity.ok(roleService.getAllRoles());
  }

  @Override
  public ResponseEntity<RoleDto> getRoleById(Long id) {
    return ResponseEntity.ok(roleService.getRoleById(id));
  }

  @Override
  public ResponseEntity<RoleDto> createRole(CreateRoleDto roleDto) {
    return ResponseEntity.ok(roleService.createRole(roleDto));
  }

}
