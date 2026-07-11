package com.donemiliano.api.features.tables.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import com.donemiliano.api.features.tables.dto.TableDto;
import com.donemiliano.api.features.tables.dto.request.TableUpdateRequest;
import com.donemiliano.api.features.tables.dto.response.TableResponse;
import com.donemiliano.api.features.tables.entity.TableEntity;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TableMapper {

    TableMapper INSTANCE = Mappers.getMapper(TableMapper.class);

    TableDto toDto(TableEntity validTableRequest);

    TableResponse toResponse(TableEntity entity);

    TableEntity updateEntityFromDto(@MappingTarget TableEntity entity, TableUpdateRequest request);

}
