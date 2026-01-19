import { Injectable } from '@nestjs/common'
import { OrderRepository } from './repositories/order.repository'

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async getAllOrders() {
    return this.orderRepository.findAll()
  }
}
