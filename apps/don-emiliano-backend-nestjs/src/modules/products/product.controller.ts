import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateCategoryDto } from './dtos/create-category.dto'
import { UpdateCategoryDto } from './dtos/update-category.dto'
import { CreateProductDto } from './dtos/create-product.dto'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProduct() {
    return this.productService.getAllProducts()
  }

  @Get('categories')
  async getAllCategories() {
    return this.productService.getAllCategory()
  }

  @Post()
  async createProduct(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data)
  }

  @Post('categories')
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.productService.createCategory(data)
  }

  @Put('categories/:categoryId')
  async updateCategory(
    @Param() categoryId: number,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.productService.updateCategory(categoryId, data)
  }

  // @Post()
  // createProduct(@Body() body: any) {}
}
