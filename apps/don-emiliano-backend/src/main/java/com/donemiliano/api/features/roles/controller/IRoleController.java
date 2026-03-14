package com.donemiliano.api.features.roles.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.donemiliano.api.features.roles.dto.CreateRoleDto;
import com.donemiliano.api.features.roles.dto.RoleDto;

import jakarta.validation.Valid;

public interface IRoleController {

  @GetMapping
  public ResponseEntity<List<RoleDto>> getAllRoles();

  @GetMapping("/{id}")
  public ResponseEntity<RoleDto> getRoleById(Long id);

  @PostMapping
  public ResponseEntity<RoleDto> createRole(@Valid @RequestBody CreateRoleDto roleDto);

}
