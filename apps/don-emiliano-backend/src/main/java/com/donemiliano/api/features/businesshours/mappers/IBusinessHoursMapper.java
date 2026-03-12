package com.donemiliano.api.features.businesshours.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.donemiliano.api.features.businesshours.dto.BusinessHoursDto;
import com.donemiliano.api.features.businesshours.dto.CreateBusinessHourDto;
import com.donemiliano.api.features.businesshours.dto.UpdateBusinessHourDto;
import com.donemiliano.api.features.businesshours.entities.BusinessHoursEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IBusinessHoursMapper {

  IBusinessHoursMapper INSTANCE = Mappers.getMapper(IBusinessHoursMapper.class);

  BusinessHoursEntity toCreateEntity(CreateBusinessHourDto dto);

  BusinessHoursEntity updateEntityFromDto(@MappingTarget BusinessHoursEntity entity, UpdateBusinessHourDto dto);

  BusinessHoursDto toDto(BusinessHoursEntity entity);

}
