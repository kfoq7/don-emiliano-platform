package com.donemiliano.api.features.tables.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.donemiliano.api.features.core.exception.exceptions.BadRequestException;
import com.donemiliano.api.features.tables.dto.request.TableUpdateRequest;
import com.donemiliano.api.features.tables.dto.request.ValidTableRequest;
import com.donemiliano.api.features.tables.dto.response.TableResponse;
import com.donemiliano.api.features.tables.entity.TableEntity;
import com.donemiliano.api.features.tables.mappers.TableMapper;
import com.donemiliano.api.features.tables.repository.TableRepository;
import com.donemiliano.api.features.tables.service.TableService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TableServiceImpl implements TableService {

    private final TableRepository tableRepository;

    private final TableMapper tableMapper;

    // If not throw exception means table doesn't exists
    private TableEntity findAndValidIsActiveTableEntity(Long tableId) {
        return tableRepository.findByIdAndIsActiveTrue(tableId)
                .orElseThrow(() -> new BadRequestException("Invalid table or is currently been used."));
    }

    @Override
    public TableResponse getAndValidIsActiveTable(Long tableId) {
        return tableMapper.toResponse(findAndValidIsActiveTableEntity(tableId));
    }

    @Override
    @Transactional
    public TableEntity validIsActiveTableOrCreate(ValidTableRequest tableRequest) {
        findAndValidIsActiveTableEntity(tableRequest.tableId());

        return tableRepository.save(TableEntity.builder()
                .tableNumber(tableRequest.tableNumber())
                .build());
    }

    @Override
    public TableResponse updateTable(Long tableId, TableUpdateRequest request) {
        TableEntity tableToUpdate = findAndValidIsActiveTableEntity(tableId);

        tableMapper.updateEntityFromDto(tableToUpdate, request);
        TableEntity tableUpdated = tableRepository.save(tableToUpdate);

        return tableMapper.toResponse(tableUpdated);
    }

}
