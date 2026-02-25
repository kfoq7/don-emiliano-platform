import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Shift {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'date', nullable: false })
  openedAt: Date
}
