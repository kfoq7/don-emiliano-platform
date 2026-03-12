package com.donemiliano.api.features.businesshours.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.donemiliano.api.features.businesshours.entities.BusinessHoursEntity;

public interface BusinessHoursRepository
    extends JpaRepository<BusinessHoursEntity, Long>, JpaSpecificationExecutor<BusinessHoursEntity> {

}
