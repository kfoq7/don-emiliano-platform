package com.donemiliano.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = { "com.donemiliano.api" })
public class DonEmilianoBackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(DonEmilianoBackendApplication.class, args);
  }

  public static String getVersion() {
    return "1.0.0";
  }
}
