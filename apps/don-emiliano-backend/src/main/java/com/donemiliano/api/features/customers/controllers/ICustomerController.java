package com.donemiliano.api.features.customers.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.donemiliano.api.features.customers.dto.CustomerDto;
import com.donemiliano.api.features.customers.dto.CreateCustomerDto;
import com.donemiliano.api.features.customers.dto.UpdateCustomerDto;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

public interface ICustomerController {

  @GetMapping
  public ResponseEntity<List<CustomerDto>> getAllCustomers();

  @GetMapping("/{id}")
  public ResponseEntity<CustomerDto> getCustomerById(@Parameter(required = true) @PathVariable(name = "id") Long id);

  @PostMapping
  public ResponseEntity<CustomerDto> createCustomer(@Valid @RequestBody CreateCustomerDto customerDto);

  @PutMapping("/{id}")
  public ResponseEntity<CustomerDto> updateCustomer(
      @Parameter(required = true) @PathVariable(name = "id") Long id,
      @Valid @RequestBody UpdateCustomerDto customerDto);

}
