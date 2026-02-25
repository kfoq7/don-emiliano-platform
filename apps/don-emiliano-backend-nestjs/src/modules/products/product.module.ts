import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { Category } from './entities/category.entity'
import { ProductController } from './product.controller'
import { ProductRepository } from './repositories/product.repository'
import { ProductService } from './product.service'
import { CategoryRepository } from './repositories/category.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductRepository, CategoryRepository, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
