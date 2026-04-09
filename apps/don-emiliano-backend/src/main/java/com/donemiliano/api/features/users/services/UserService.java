package com.donemiliano.api.features.users.services;

import java.util.List;

import com.donemiliano.api.features.users.dto.CreateUserDto;
import com.donemiliano.api.features.users.dto.UpdateUserDto;
import com.donemiliano.api.features.users.dto.UserDto;
import com.donemiliano.api.features.users.dto.UserWithRolesDto;

public interface UserService {

  List<UserDto> getAllUsers();

  List<UserWithRolesDto> getAllUsersWithRoles();

  UserDto createUser(CreateUserDto createUserDto);

  UserDto updateUser(Long id, UpdateUserDto updateUserDto);

}
