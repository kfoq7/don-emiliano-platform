package com.donemiliano.api.features.tables.service;

import com.donemiliano.api.features.tables.dto.request.TableUpdateRequest;
import com.donemiliano.api.features.tables.dto.request.ValidTableRequest;
import com.donemiliano.api.features.tables.dto.response.TableResponse;
import com.donemiliano.api.features.tables.entity.TableEntity;

public interface TableService {

    TableResponse getAndValidIsActiveTable(Long tableId);

    TableResponse updateTable(Long tableId, TableUpdateRequest request);

    // TableEntity validOrCreateIsActiveTable(ValidTableRequest tableRequest);

    TableEntity validIsActiveTableOrCreate(ValidTableRequest tableRequest);

}
