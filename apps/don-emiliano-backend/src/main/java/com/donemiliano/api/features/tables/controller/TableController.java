package com.donemiliano.api.features.tables.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.donemiliano.api.features.tables.dto.request.TableUpdateRequest;
import com.donemiliano.api.features.tables.dto.response.TableResponse;

public interface TableController {

    @GetMapping("/{tableId}")
    ResponseEntity<TableResponse> getTable(@PathVariable Long tableId);

    @PutMapping("/{tableId}")
    ResponseEntity<TableResponse> updateTable(@PathVariable Long tableId, @RequestBody TableUpdateRequest body);

}
