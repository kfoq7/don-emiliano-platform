import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm'
import { Order } from './order.entity'
import { Product } from '@modules/products/entities/product.entity'

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne('Order', 'orderItem')
  @JoinColumn()
  order: Relation<Order>

  @ManyToOne('Product', 'orderItem', { eager: true })
  @JoinColumn()
  product: Relation<Product>

  @Column({ type: 'int' })
  quantity: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number
}
