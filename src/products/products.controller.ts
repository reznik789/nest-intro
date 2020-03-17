import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('description') descr: string,
    @Body('price') price: number,
  ) {
    const id = await this.productService.insertProduct(title, descr, price);
    return { id };
  }

  @Get()
  async getProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  async getSingleProduct(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') descr: string,
    @Body('price') price: number,
  ) {
    await this.productService.updateProductById(id, title, descr, price);
    return {
      success: true,
    };
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    await this.productService.deleteProductById(id);
    return {
      success: true,
    };
  }
}
