import { Product } from './products.model';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const newProdId = new Date().getTime().toString();
    this.products.push(new Product(newProdId, title, description, price));
    return newProdId;
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: string) {
    const [product] = this.findProductById(id);
    return { ...product };
  }

  updateProductById(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProductById(id);
    const newProduct = { ...product };
    if (title) {
      newProduct.title = title;
    }
    if (description) {
      newProduct.description = description;
    }
    if (price) {
      newProduct.price = price;
    }
    this.products[index] = newProduct;
  }

  deleteProductById(id: string) {
    const index = this.findProductById(id)[1];
    this.products.splice(index, 1);
  }

  private findProductById(id: string): [Product, number] {
    const index = this.products.findIndex(prod => prod.id === id);
    if (index === -1) {
      throw new NotFoundException("Can't find product with such id");
    }
    return [this.products[index], index];
  }
}
