package com.donemiliano.api.features.products.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.donemiliano.api.features.common.mappers.DateMapper;
import com.donemiliano.api.features.products.dto.CategoryDto;
import com.donemiliano.api.features.products.dto.CategoryWithProductsDto;
import com.donemiliano.api.features.products.dto.CreateCategoryDto;
import com.donemiliano.api.features.products.entities.CategoryEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, uses = {
    DateMapper.class, })
public interface ICategoryMapper {

  ICategoryMapper INSTANCE = Mappers.getMapper(ICategoryMapper.class);

  CategoryDto toDto(CategoryEntity entity);

  CategoryEntity toCreateEntity(CreateCategoryDto dto);

  @Mapping(target = "products", source = "products")
  CategoryWithProductsDto toDtoWithProducts(CategoryEntity entity);

}
