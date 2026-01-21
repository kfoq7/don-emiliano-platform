import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  type Relation,
} from 'typeorm'
import { Category } from './category.entity'

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column({ default: true })
  isAvailable: boolean

  @Column({ default: true })
  isStockAvailable: boolean

  @ManyToOne('Category', 'products', { cascade: ['recover'] })
  @JoinColumn()
  category: Relation<Category>

  @CreateDateColumn()
  caretedAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
