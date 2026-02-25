import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Order } from '../entities/order.entity'
import { CreateOrderDto } from '../dto/create-order.dto'

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  /**
   * TODO: Add filters or pagination
   */
  async findAll() {
    return this.orderRepository.find()
  }

  async createOrder(data: CreateOrderDto) {
    const { orderItems, userId, ...restData } = data

    const orderCreated = this.orderRepository.create({
      ...restData,
      user: { id: userId },
      orderItems: orderItems.map(({ productId, ...itemData }) => ({
        ...itemData,
        product: { id: productId },
      })),
    })

    return this.orderRepository.save(orderCreated)
  }
}
