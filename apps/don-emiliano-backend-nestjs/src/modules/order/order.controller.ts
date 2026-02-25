import { Body, Controller, Get, Post } from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders()
  }

  @Post()
  async createOrder(@Body() data: CreateOrderDto) {
    return this.orderService.createOrder(data)
  }
}
