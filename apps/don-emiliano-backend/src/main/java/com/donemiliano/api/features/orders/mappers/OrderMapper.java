package com.donemiliano.api.features.orders.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.donemiliano.api.features.orders.dtos.CreateOrderDto;
import com.donemiliano.api.features.orders.dtos.OrderDto;
import com.donemiliano.api.features.orders.dtos.PaymentOrderUpdateDto;
import com.donemiliano.api.features.orders.dtos.response.OrderResponse;
import com.donemiliano.api.features.orders.entities.OrderEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {

    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(target = "orderItems", source = "orderItems")
    OrderDto toDto(OrderEntity entity);

    OrderEntity toCreateEntity(CreateOrderDto dto);

    OrderResponse toResponse(OrderEntity entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    OrderEntity updateEntityFromDto(@MappingTarget OrderEntity entity, PaymentOrderUpdateDto dto);

    // OrderDto updateDtoFromEntity(OrderEntity entity);

}
