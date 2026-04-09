package com.donemiliano.api.features.businesshours.service;

import java.util.List;

import com.donemiliano.api.features.businesshours.dto.BusinessHoursDto;
import com.donemiliano.api.features.businesshours.dto.CreateBusinessHourDto;
import com.donemiliano.api.features.businesshours.dto.UpdateBusinessHourDto;

public interface BusinessHoursService {

  List<BusinessHoursDto> getAllBusinessHours();

  List<BusinessHoursDto> seed();

  BusinessHoursDto createBusinessHours(CreateBusinessHourDto businessHoursDto);

  BusinessHoursDto updateBusinessHours(Long id, UpdateBusinessHourDto businessHoursDto);

}
