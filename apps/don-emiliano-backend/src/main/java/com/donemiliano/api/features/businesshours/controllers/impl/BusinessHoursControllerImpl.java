package com.donemiliano.api.features.businesshours.controllers.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donemiliano.api.features.businesshours.controllers.BusinessHoursController;
import com.donemiliano.api.features.businesshours.dto.BusinessHoursDto;
import com.donemiliano.api.features.businesshours.dto.CreateBusinessHourDto;
import com.donemiliano.api.features.businesshours.dto.UpdateBusinessHourDto;
import com.donemiliano.api.features.businesshours.service.BusinessHoursService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/business-hours")
@RequiredArgsConstructor
public class BusinessHoursControllerImpl implements BusinessHoursController {

  private final BusinessHoursService businessHoursService;

  @Override
  public ResponseEntity<List<BusinessHoursDto>> getAllBusinessHours() {
    return ResponseEntity.ok(businessHoursService.getAllBusinessHours());
  }

  @Override
  public ResponseEntity<List<BusinessHoursDto>> seed() {
    return ResponseEntity.ok(businessHoursService.seed());
  }

  @Override
  public ResponseEntity<BusinessHoursDto> createBusinessHours(CreateBusinessHourDto businessHoursDto) {
    return ResponseEntity.ok(businessHoursService.createBusinessHours(businessHoursDto));
  }

  @Override
  public ResponseEntity<BusinessHoursDto> updateBusinessHours(Long id, UpdateBusinessHourDto businessHoursDto) {
    return ResponseEntity.ok(businessHoursService.updateBusinessHours(id, businessHoursDto));
  }

}
