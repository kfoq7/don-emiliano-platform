import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  type Relation,
} from 'typeorm'
import { User } from '@modules/user/entities/user.entity'
import { OrderItem } from './order-product.entity'

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne('User', 'orders', { eager: true })
  @JoinColumn()
  user: Relation<User>

  @OneToMany('OrderItem', 'order', { cascade: ['insert', 'recover'] })
  orderItems: Relation<OrderItem[]>

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string // pending, completed, cancelled

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
