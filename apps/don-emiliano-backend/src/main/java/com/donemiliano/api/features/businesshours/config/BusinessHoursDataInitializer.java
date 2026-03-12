package com.donemiliano.api.features.businesshours.config;

import com.donemiliano.api.features.businesshours.data.BusinessHoursSeed;
import com.donemiliano.api.features.businesshours.entities.BusinessHoursEntity;
import com.donemiliano.api.features.businesshours.repositories.BusinessHoursRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class BusinessHoursDataInitializer implements CommandLineRunner {

  private final BusinessHoursRepository repository;

  @Override
  public void run(String... args) {
    if (repository.count() == 0) {
      List<BusinessHoursEntity> defaultHours = BusinessHoursSeed.createDefaultSeed();
      repository.saveAll(defaultHours);
    }
  }

}
