package com.donemiliano.api.features.users.controller.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donemiliano.api.features.users.controller.UserController;
import com.donemiliano.api.features.users.dto.CreateUserDto;
import com.donemiliano.api.features.users.dto.UpdateUserDto;
import com.donemiliano.api.features.users.dto.UserDto;
import com.donemiliano.api.features.users.dto.UserWithRolesDto;
import com.donemiliano.api.features.users.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserControllerImpl implements UserController {

  private final UserService userService;

  @Override
  public ResponseEntity<List<UserWithRolesDto>> getAllUsers() {
    return ResponseEntity.ok(userService.getAllUsersWithRoles());
  }

  @Override
  public ResponseEntity<UserDto> createUser(CreateUserDto dto) {
    return ResponseEntity.ok(userService.createUser(dto));
  }

  @Override
  public ResponseEntity<UserDto> updateUser(Long id, UpdateUserDto dto) {
    return ResponseEntity.ok(userService.updateUser(id, dto));
  }

}
