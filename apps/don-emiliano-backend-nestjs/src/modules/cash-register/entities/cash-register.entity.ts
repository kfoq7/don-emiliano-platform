import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CashRegister {
  @PrimaryGeneratedColumn()
  id: number
}
