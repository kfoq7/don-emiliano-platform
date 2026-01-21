import { Order } from '@modules/order/entities/order.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  type Relation,
} from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'text', unique: true })
  email: string

  @Column({ type: 'text' })
  password: string

  @Column({ type: 'text' })
  firstName: string

  @Column({ type: 'text' })
  lastName: string

  @Column({ default: true })
  isActive: boolean

  @OneToMany('Order', 'user')
  orders: Relation<Order[]>

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
