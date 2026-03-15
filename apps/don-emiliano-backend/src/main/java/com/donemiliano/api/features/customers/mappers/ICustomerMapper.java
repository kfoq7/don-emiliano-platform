package com.donemiliano.api.features.customers.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.donemiliano.api.features.customers.dto.CustomerDto;
import com.donemiliano.api.features.customers.dto.CreateCustomerDto;
import com.donemiliano.api.features.customers.dto.UpdateCustomerDto;
import com.donemiliano.api.features.customers.entities.CustomerEntity;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface ICustomerMapper {

  ICustomerMapper INSTANCE = Mappers.getMapper(ICustomerMapper.class);

  CustomerDto toDto(CustomerEntity entity);

  CustomerEntity toCreateEntity(CreateCustomerDto dto);

  CustomerEntity updateEntityFromDto(@MappingTarget CustomerEntity entity, UpdateCustomerDto dto);

}
