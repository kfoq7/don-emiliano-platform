package com.donemiliano.api.features.customers.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.donemiliano.api.features.customers.dto.CustomerDto;
import com.donemiliano.api.features.customers.dto.CreateCustomerDto;
import com.donemiliano.api.features.customers.dto.UpdateCustomerDto;
import com.donemiliano.api.features.customers.entities.CustomerEntity;
import com.donemiliano.api.features.customers.mappers.ICustomerMapper;
import com.donemiliano.api.features.customers.repositories.CustomerRepository;
import com.donemiliano.api.features.customers.services.CustomerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

  private final CustomerRepository customerRepository;
  private final ICustomerMapper customerMapper;

  @Override
  public List<CustomerDto> getAll() {
    return customerRepository.findAll().stream()
        .map(customerMapper::toDto)
        .toList();
  }

  @Override
  public CustomerDto getById(Long id) {
    return customerRepository.findById(id)
        .map(customerMapper::toDto)
        .orElseThrow(() -> new RuntimeException("Customer not found"));
  }

  @Override
  public CustomerDto createCustomer(CreateCustomerDto createCustomerDto) {
    CustomerEntity customerEntity = customerMapper.toCreateEntity(createCustomerDto);
    CustomerEntity savedCustomer = customerRepository.save(customerEntity);
    return customerMapper.toDto(savedCustomer);
  }

  @Override
  public CustomerDto updateCustomer(Long id, UpdateCustomerDto updateCustomerDto) {
    CustomerEntity customerEntity = customerRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Customer not found"));

    customerMapper.updateEntityFromDto(customerEntity, updateCustomerDto);
    CustomerEntity updatedCustomer = customerRepository.save(customerEntity);

    return customerMapper.toDto(updatedCustomer);
  }

}
