package com.donemiliano.api.features.staff.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Staffs")
@Accessors(chain = true)
public class StaffEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "staff_id_seq")
  @SequenceGenerator(name = "staff_id_seq", sequenceName = "staff_id_seq", allocationSize = 1)
  @Column(name = "id", updatable = false, nullable = false)
  private Long id;

}
