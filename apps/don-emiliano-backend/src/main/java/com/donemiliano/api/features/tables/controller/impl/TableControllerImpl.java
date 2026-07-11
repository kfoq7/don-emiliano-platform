package com.donemiliano.api.features.tables.controller.impl;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donemiliano.api.features.tables.controller.TableController;
import com.donemiliano.api.features.tables.dto.response.TableResponse;
import com.donemiliano.api.features.tables.service.TableService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/table")
@RequiredArgsConstructor
public class TableControllerImpl implements TableController {

    private final TableService tableService;

    @Override
    public ResponseEntity<TableResponse> getTable(Long tableId) {
        return ResponseEntity.ok(tableService.getAndValidIsActiveTable(tableId));
    }

}
