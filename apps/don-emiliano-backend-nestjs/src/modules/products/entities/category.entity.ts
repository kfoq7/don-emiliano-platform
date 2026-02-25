import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  type Relation,
} from 'typeorm'
import { Product } from './product.entity'

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'text' })
  name: string

  @OneToMany('Product', 'category')
  products: Relation<Product[]>

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
