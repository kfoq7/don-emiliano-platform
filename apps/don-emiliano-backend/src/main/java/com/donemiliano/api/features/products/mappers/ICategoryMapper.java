package com.donemiliano.api.features.products.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

import com.donemiliano.api.features.common.mappers.DateMapper;
import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.entities.CategoryEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, uses = {
    DateMapper.class, })
public interface ICategoryMapper {

  CategoryDto toDto(CategoryEntity entity);

}
