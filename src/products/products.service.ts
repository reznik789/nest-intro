import { Product, ProductModel } from './products.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductModel>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return result._id as string;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products.map(({ _id, title, description, price }) => ({
      id: _id,
      title,
      description,
      price,
    }));
  }

  async getProductById(id: string): Promise<Product> {
    const { _id, title, description, price } = await this.findProductById(id);
    return { id: _id, title, description, price };
  }

  async updateProductById(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = await this.findProductById(id);
    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    return product.save();
  }

  async deleteProductById(id: string) {
    const res = await this.productModel.deleteOne({ _id: id });
    if (!res || res.n < 0) {
      throw new NotFoundException("Can't find product with such id");
    }
    return true;
  }

  private async findProductById(id: string): Promise<ProductModel> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException("Can't find product with such id");
    }
    if (!product) {
      throw new NotFoundException("Can't find product with such id");
    }
    return product;
  }
}
