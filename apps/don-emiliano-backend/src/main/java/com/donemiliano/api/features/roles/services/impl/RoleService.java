package com.donemiliano.api.features.roles.services.impl;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.donemiliano.api.features.roles.dto.CreateRoleDto;
import com.donemiliano.api.features.roles.dto.RoleDto;
import com.donemiliano.api.features.roles.entities.RoleEntity;
import com.donemiliano.api.features.roles.mappers.IRoleMapper;
import com.donemiliano.api.features.roles.respositories.RoleRepository;
import com.donemiliano.api.features.roles.services.IRoleService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {

  private final IRoleMapper roleMapper;
  private final RoleRepository roleRepository;

  @Override
  public List<RoleDto> getAllRoles() {
    return roleRepository.findAll().stream()
        .map(roleMapper::toDto)
        .toList();
  }

  @Override
  public RoleDto getRoleById(Long id) {
    RoleEntity role = roleRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Role not found"));

    return roleMapper.toDto(role);
  }

  @Override
  public List<RoleDto> getRolesByIds(Set<Long> ids) {
    return roleRepository.findAllById(ids).stream()
        .map(roleMapper::toDto)
        .toList();
  }

  @Override
  public RoleDto createRole(CreateRoleDto roleDto) {
    RoleEntity roleEntity = roleMapper.toCreateEntity(roleDto);
    RoleEntity savedRole = roleRepository.save(roleEntity);
    return roleMapper.toDto(savedRole);
  }

}
