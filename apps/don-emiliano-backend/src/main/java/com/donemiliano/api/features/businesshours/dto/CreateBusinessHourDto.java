package com.donemiliano.api.features.businesshours.dto;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class CreateBusinessHourDto {

  private LocalTime openTime;

  private LocalTime closeTime;

}
