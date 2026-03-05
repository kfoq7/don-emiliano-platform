package com.donemiliano.api.features.products.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@ToString
@Accessors(chain = true)
public class UpdateProductDto extends CreateProductDto {

}
