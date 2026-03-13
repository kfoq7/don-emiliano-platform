package com.donemiliano.api.features.roles.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.donemiliano.api.features.roles.dto.CreateRoleDto;
import com.donemiliano.api.features.roles.dto.RoleDto;
import com.donemiliano.api.features.roles.entities.RoleEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IRoleMapper {

  IRoleMapper INSTANCE = Mappers.getMapper(IRoleMapper.class);

  RoleEntity toCreateEntity(CreateRoleDto dto);

  RoleDto toDto(RoleEntity entity);

}
