package com.donemiliano.api.features.products.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.donemiliano.api.features.products.dto.CreateProductDto;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.dto.ProductWithCategoryDto;
import com.donemiliano.api.features.products.dto.UpdateProductDto;
import com.donemiliano.api.features.products.entities.ProductEntity;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE, uses = {
    ICategoryMapper.class, })
public interface IProductMapper {

  IProductMapper INSTANCE = Mappers.getMapper(IProductMapper.class);

  ProductEntity toCreateEntity(CreateProductDto dto);

  ProductEntity updateEntityFromDto(@MappingTarget ProductEntity entity, UpdateProductDto dto);

  ProductDto toDto(ProductEntity entity);

  @Mapping(target = "category", source = "category")
  ProductWithCategoryDto toDtoWithCategory(ProductEntity entity);

}
