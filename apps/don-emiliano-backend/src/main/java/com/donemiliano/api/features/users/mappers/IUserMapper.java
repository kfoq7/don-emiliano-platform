package com.donemiliano.api.features.users.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.donemiliano.api.features.users.dto.CreateUserDto;
import com.donemiliano.api.features.users.dto.UpdateUserDto;
import com.donemiliano.api.features.users.dto.UserDto;
import com.donemiliano.api.features.users.entities.UserEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface IUserMapper {

  IUserMapper INSTANCE = Mappers.getMapper(IUserMapper.class);

  UserDto toDto(UserEntity entity);

  UserEntity toCreateEntity(CreateUserDto dto);

  UserEntity updateEntityFromDto(@MappingTarget UserEntity entity, UpdateUserDto dto);

}
