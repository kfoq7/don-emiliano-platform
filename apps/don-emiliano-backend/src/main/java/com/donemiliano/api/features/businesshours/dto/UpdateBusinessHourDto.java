package com.donemiliano.api.features.businesshours.dto;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UpdateBusinessHourDto {

  @NotNull(message = "{validation.businessHours.isClosed}")
  @JsonProperty("isClosed")
  private Boolean isClosed;

  @NotNull(message = "{validation.businessHours.openTime}")
  private LocalTime openTime;

  @NotNull(message = "{validation.businessHours.closeTime}")
  private LocalTime closeTime;

}
