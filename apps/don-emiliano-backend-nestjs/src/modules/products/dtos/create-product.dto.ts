import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  price: number

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean

  @IsBoolean()
  @IsOptional()
  isStockAvailable?: boolean

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  categoryId: number
}
