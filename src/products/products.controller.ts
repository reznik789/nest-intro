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
  addProduct(
    @Body('title') title: string,
    @Body('description') descr: string,
    @Body('price') price: number,
  ) {
    const id = this.productService.insertProduct(title, descr, price);
    return { id };
  }

  @Get()
  getProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getSingleProduct(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') descr: string,
    @Body('price') price: number,
  ) {
    this.productService.updateProductById(id, title, descr, price);
    return {
      success: true,
    };
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productService.deleteProductById(id);
    return {
      success: true,
    };
  }
}
