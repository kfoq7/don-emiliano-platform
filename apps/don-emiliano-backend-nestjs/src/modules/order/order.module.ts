import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './entities/order.entity'
import { OrderItem } from './entities/order-product.entity'
import { OrderController } from './order.controller'
import { OrderRepository } from './repositories/order.repository'
import { OrderService } from './order.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
})
export class OrderModule {}
