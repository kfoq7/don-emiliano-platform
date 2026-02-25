import { Injectable } from '@nestjs/common'
import { OrderRepository } from './repositories/order.repository'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAllOrders() {
    return this.orderRepository.findAll()
  }

  async createOrder(data: CreateOrderDto) {
    return this.orderRepository.createOrder(data)
  }
}
