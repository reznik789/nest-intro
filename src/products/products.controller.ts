import { Controller, Post, Body } from '@nestjs/common';
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
}
