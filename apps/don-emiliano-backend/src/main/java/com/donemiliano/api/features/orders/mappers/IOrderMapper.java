package com.donemiliano.api.features.orders.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.donemiliano.api.features.orders.dtos.CreateOrderDto;
import com.donemiliano.api.features.orders.dtos.OrderDto;
import com.donemiliano.api.features.orders.entities.OrderEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface IOrderMapper {

  IOrderMapper INSTANCE = Mappers.getMapper(IOrderMapper.class);

  @Mapping(target = "orderItems", source = "orderItems")
  OrderDto toDto(OrderEntity entity);

  OrderEntity toCreateEntity(CreateOrderDto dto);

  // OrderDto updateDtoFromEntity(OrderEntity entity);

}
