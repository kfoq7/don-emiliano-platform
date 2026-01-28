import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Shift } from './entities/shif.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Shift])],
})
export class ShiftModule {}
