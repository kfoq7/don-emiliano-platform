package com.donemiliano.api.features.customers.controllers.impl;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.donemiliano.api.features.customers.controllers.CustomerController;
import com.donemiliano.api.features.customers.dto.CustomerDto;
import com.donemiliano.api.features.customers.dto.CreateCustomerDto;
import com.donemiliano.api.features.customers.dto.UpdateCustomerDto;
import com.donemiliano.api.features.customers.services.CustomerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerControllerImpl implements CustomerController {

  private final CustomerService customerService;

  @Override
  public ResponseEntity<List<CustomerDto>> getAllCustomers() {
    List<CustomerDto> customers = customerService.getAll();
    return ResponseEntity.ok(customers);
  }

  @Override
  public ResponseEntity<CustomerDto> getCustomerById(Long id) {
    return ResponseEntity.ok(customerService.getById(id));

  }

  @Override
  public ResponseEntity<CustomerDto> createCustomer(CreateCustomerDto customerDto) {
    return ResponseEntity.ok(customerService.createCustomer(customerDto));
  }

  @Override
  public ResponseEntity<CustomerDto> updateCustomer(Long id, UpdateCustomerDto customerDto) {
    return ResponseEntity.ok(customerService.updateCustomer(id, customerDto));
  }

}
