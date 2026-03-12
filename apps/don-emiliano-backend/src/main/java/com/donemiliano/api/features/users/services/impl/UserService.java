package com.donemiliano.api.features.users.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.donemiliano.api.features.users.dto.CreateUserDto;
import com.donemiliano.api.features.users.dto.UpdateUserDto;
import com.donemiliano.api.features.users.dto.UserDto;
import com.donemiliano.api.features.users.entities.UserEntity;
import com.donemiliano.api.features.users.mappers.IUserMapper;
import com.donemiliano.api.features.users.repositories.UserRepository;
import com.donemiliano.api.features.users.services.IUserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

  private final UserRepository userRepository;
  private final IUserMapper userMapper;

  @Override
  public List<UserDto> getAllUsers() {
    return userRepository.findAll().stream()
        .map(userMapper::toDto)
        .toList();
  }

  @Override
  public UserDto createUser(CreateUserDto createUserDto) {
    UserEntity user = userMapper.toCreateEntity(createUserDto);
    UserEntity savedUser = userRepository.save(user);

    return userMapper.toDto(savedUser);
  }

  @Override
  @Transactional
  public UserDto updateUser(Long id, UpdateUserDto updateUserDto) {
    UserEntity user = userRepository.findById(id).orElseThrow(() -> new RuntimeException());

    userMapper.updateEntityFromDto(user, updateUserDto);
    UserEntity updatedUser = userRepository.save(user);

    return userMapper.toDto(updatedUser);
  }

}
