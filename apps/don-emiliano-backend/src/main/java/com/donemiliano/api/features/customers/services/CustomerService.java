package com.donemiliano.api.features.customers.services;

import java.util.List;

import com.donemiliano.api.features.customers.dto.CustomerDto;
import com.donemiliano.api.features.customers.dto.CreateCustomerDto;
import com.donemiliano.api.features.customers.dto.UpdateCustomerDto;

public interface CustomerService {

  List<CustomerDto> getAll();

  CustomerDto getById(Long id);

  CustomerDto createCustomer(CreateCustomerDto createCustomerDto);

  CustomerDto updateCustomer(Long id, UpdateCustomerDto updateCustomerDto);

}
