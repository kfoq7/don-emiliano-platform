package com.donemiliano.api.features.products.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.donemiliano.api.features.products.dto.CreateProductDto;
import com.donemiliano.api.features.products.dto.ProductDto;
import com.donemiliano.api.features.products.dto.ProductWithCategoryDto;
import com.donemiliano.api.features.products.entities.ProductEntity;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface IProductMapper {

  IProductMapper INSTANCE = Mappers.getMapper(IProductMapper.class);

  /**
   * Convert Create DTO to entity for saving in tabbles
   */
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "category", source = "categoryId", ignore = true)
  ProductEntity toCreateEntity(CreateProductDto dto);

  ProductDto toDto(ProductEntity entity);

  @Mapping(target = "category", source = "category")
  ProductWithCategoryDto toDtoWithCategory(ProductEntity dto);
}
