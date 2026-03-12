package com.donemiliano.api.features.businesshours.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Accessors(chain = true)
public class BusinessHoursDto {

  private Long id;

  private Integer dayOfWeek;

  private String dayName;

  private String openTime;

  private String closeTime;

  private Boolean isClosed;

}
