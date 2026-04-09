package com.donemiliano.api.features.businesshours.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.donemiliano.api.features.businesshours.data.BusinessHoursSeed;
import com.donemiliano.api.features.businesshours.dto.BusinessHoursDto;
import com.donemiliano.api.features.businesshours.dto.CreateBusinessHourDto;
import com.donemiliano.api.features.businesshours.dto.UpdateBusinessHourDto;
import com.donemiliano.api.features.businesshours.entities.BusinessHoursEntity;
import com.donemiliano.api.features.businesshours.mappers.IBusinessHoursMapper;
import com.donemiliano.api.features.businesshours.repositories.BusinessHoursRepository;
import com.donemiliano.api.features.businesshours.service.BusinessHoursService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BusinessHoursServiceImpl implements BusinessHoursService {

  private final BusinessHoursRepository businessHoursRepository;
  private final IBusinessHoursMapper businessHoursMapper;

  @Override
  public List<BusinessHoursDto> getAllBusinessHours() {
    return this.businessHoursRepository.findAll().stream()
        .map(businessHoursMapper::toDto)
        .toList();
  }

  @Override
  @Transactional
  public List<BusinessHoursDto> seed() {
    if (this.businessHoursRepository.count() == 0) {
      List<BusinessHoursEntity> defaultHours = BusinessHoursSeed.createDefaultSeed();
      this.businessHoursRepository.saveAll(defaultHours);
    }

    return this.getAllBusinessHours();
  }

  @Override
  public BusinessHoursDto createBusinessHours(CreateBusinessHourDto businessHoursDto) {
    // TODO: add a valtion to check if there is more one more day
    BusinessHoursEntity entity = businessHoursMapper.toCreateEntity(businessHoursDto);
    BusinessHoursEntity savedEntity = this.businessHoursRepository.save(entity);
    return businessHoursMapper.toDto(savedEntity);
  }

  @Override
  @Transactional
  public BusinessHoursDto updateBusinessHours(Long id, UpdateBusinessHourDto businessHoursDto) {
    BusinessHoursEntity businessHour = this.businessHoursRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Business Hour not found"));

    BusinessHoursEntity updatedEntity = businessHoursMapper.updateEntityFromDto(businessHour, businessHoursDto);
    BusinessHoursEntity savedEntity = this.businessHoursRepository.save(updatedEntity);

    return businessHoursMapper.toDto(savedEntity);
  }

}
