import { Type } from 'class-transformer'
import {
  IsArray,
  IsDefined,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator'
import { CreateOrderItemDto } from './create-order-items.dto'

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  userId: number

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  totalAmount: number

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[]
}
