package com.donemiliano.api.features.businesshours.data;

import java.time.LocalTime;
import java.util.List;

import com.donemiliano.api.features.businesshours.entities.BusinessHoursEntity;
// import com.fasterxml.jackson.core.type.TypeReference;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class BusinessHoursSeed {

  // public static final String SEED_DATA = """
  // [
  // {"dayOfWeek":1,"dayName":"Lunes","openTime":"08:00","closeTime":"22:00","isClosed":false},
  // {"dayOfWeek":2,"dayName":"Martes","openTime":"08:00","closeTime":"22:00","isClosed":false},
  // {"dayOfWeek":3,"dayName":"Miércoles","openTime":"08:00","closeTime":"22:00","isClosed":false},
  // {"dayOfWeek":4,"dayName":"Jueves","openTime":"08:00","closeTime":"22:00","isClosed":false},
  // {"dayOfWeek":5,"dayName":"Viernes","openTime":"08:00","closeTime":"23:00","isClosed":false},
  // {"dayOfWeek":6,"dayName":"Sábado","openTime":"08:00","closeTime":"23:00","isClosed":false},
  // {"dayOfWeek":7,"dayName":"Domingo","openTime":null,"closeTime":null,"isClosed":true}
  // ]
  // """;

  public static BusinessHoursEntity createDay(int dayNum, String name, String open, String close) {
    return BusinessHoursEntity.builder()
        .dayOfWeek(dayNum)
        .dayName(name)
        .openTime(LocalTime.parse(open))
        .closeTime(LocalTime.parse(close))
        .isClosed(false)
        .build();
  }

  public static BusinessHoursEntity createClosedDay(int dayNum, String name) {
    return BusinessHoursEntity.builder()
        .dayOfWeek(dayNum)
        .dayName(name)
        .isClosed(true)
        .build();
  }

  public static List<BusinessHoursEntity> createDefaultSeed() {
    return List.of(
        createDay(1, "Lunes", "08:00", "22:00"),
        createDay(2, "Martes", "08:00", "22:00"),
        createDay(3, "Miércoles", "08:00", "22:00"),
        createDay(4, "Jueves", "08:00", "22:00"),
        createDay(5, "Viernes", "08:00", "23:00"),
        createDay(6, "Sábado", "08:00", "23:00"),
        createClosedDay(7, "Domingo"));
  }

  // public static List<BusinessHoursEntity> loadFromJson() {
  // try {
  // ObjectMapper mapper = new ObjectMapper();
  // mapper.registerModule(new JavaTimeModule());
  // return mapper.readValue(SEED_DATA, new
  // TypeReference<List<BusinessHoursEntity>>() {
  // });
  // } catch (Exception e) {
  // throw new RuntimeException("Failed to parse business hours seed data", e);
  // }
  // }

  public static BusinessHoursEntity findByDayOfWeek(List<BusinessHoursEntity> hours, int dayOfWeek) {
    return hours.stream()
        .filter(h -> h.getDayOfWeek() == dayOfWeek)
        .findFirst()
        .orElse(null);
  }

}
