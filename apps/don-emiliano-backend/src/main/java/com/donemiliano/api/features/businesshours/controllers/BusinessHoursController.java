package com.donemiliano.api.features.businesshours.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.donemiliano.api.features.businesshours.dto.BusinessHoursDto;
import com.donemiliano.api.features.businesshours.dto.CreateBusinessHourDto;
import com.donemiliano.api.features.businesshours.dto.UpdateBusinessHourDto;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;

public interface BusinessHoursController {

  @GetMapping
  public ResponseEntity<List<BusinessHoursDto>> getAllBusinessHours();

  @GetMapping("/seed")
  public ResponseEntity<List<BusinessHoursDto>> seed();

  @PostMapping
  public ResponseEntity<BusinessHoursDto> createBusinessHours(
      @Valid() @RequestBody() CreateBusinessHourDto businessHoursDto);

  @PutMapping("/{id}")
  public ResponseEntity<BusinessHoursDto> updateBusinessHours(
      @Parameter(required = true) @PathVariable(name = "id") Long id,
      @Valid @RequestBody UpdateBusinessHourDto businessHoursDto);

}
