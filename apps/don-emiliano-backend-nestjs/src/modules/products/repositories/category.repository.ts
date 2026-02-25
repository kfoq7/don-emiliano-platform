import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from '../entities/category.entity'
import { type Repository } from 'typeorm'
import { CreateCategoryDto } from '../dtos/create-category.dto'
import { UpdateCategoryDto } from '../dtos/update-category.dto'

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return this.categoryRepository.find()
  }

  async findById(categoryId: number) {
    return this.categoryRepository.findOneBy({ id: categoryId })
  }

  async create(category: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(category)
    return this.categoryRepository.save(newCategory)
  }

  async update(categoryId: number, categoryData: UpdateCategoryDto) {
    await this.categoryRepository.update(categoryId, categoryData)
    return this.categoryRepository.findOne({ where: { id: categoryId } })
  }
}
