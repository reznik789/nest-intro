import { Product } from './products.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const newProdId = new Date().toString();
    this.products.push(new Product(newProdId, title, description, price));
    return newProdId;
  }
}
