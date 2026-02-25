import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { type Repository } from 'typeorm'
import { Product } from '../entities/product.entity'
import { CreateProductDto } from '../dtos/create-product.dto'
import { UpdateProductDto } from '../dtos/update-product.dto'

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productRepository.find()
  }

  async create(data: CreateProductDto): Promise<Product> {
    const { categoryId, ...restData } = data

    const newProduct = this.productRepository.create({
      ...restData,
      category: { id: categoryId },
    })

    return this.productRepository.save(newProduct)
  }

  async update(productId: number, data: UpdateProductDto) {
    await this.productRepository.update(productId, data)
    return this.productRepository.findOne({ where: { id: productId } })
  }
}
