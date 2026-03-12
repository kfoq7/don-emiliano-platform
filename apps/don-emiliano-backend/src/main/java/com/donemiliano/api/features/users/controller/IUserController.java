package com.donemiliano.api.features.users.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.donemiliano.api.features.users.dto.CreateUserDto;
import com.donemiliano.api.features.users.dto.UpdateUserDto;
import com.donemiliano.api.features.users.dto.UserDto;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

public interface IUserController {

  @GetMapping
  public ResponseEntity<List<UserDto>> getAllUsers();

  @PostMapping
  public ResponseEntity<UserDto> createUser(@Valid @RequestBody CreateUserDto dto);

  @PutMapping("/{id}")
  public ResponseEntity<UserDto> updateUser(
      @Parameter(required = true) @PathVariable(name = "id") Long id,
      @Valid @RequestBody UpdateUserDto dto);

}
