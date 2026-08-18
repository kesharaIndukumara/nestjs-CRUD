import { Injectable, NotFoundException } from '@nestjs/common';

export interface Iproduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
}

@Injectable()
export class ProductService {
  private products: Iproduct[] = [];

  getAllProducts() {
    return this.products;
  }

  getById(id: number) {
    console.log(`Getting product with id: ${id}`);
    let product: null | Iproduct = null;
    for (const productElement of this.products) {
      if (productElement.id === id) {
        product = productElement;
        break;
      }
    }
    if (product) return product;
    else throw new NotFoundException(`Product with id ${id} not found`);
  }

  createProduct(product: Iproduct) {
    this.products.push({ ...product, id: this.products.length + 1 });
    return 'Successfully created product with id: ' + this.products.length;
  }

  findProductIndex(id: number) {
    return this.products.findIndex((product) => product.id === id);
  }

  updateProduct(id: number, updateProduct: Iproduct) {
    const productIndex = this.findProductIndex(id);
    if (productIndex >= 0) {
      this.products.splice(productIndex, 1, {
        ...this.products[productIndex],
        ...updateProduct,
      });
      return 'Successfully updated product ' + updateProduct.name;
    } else throw new NotFoundException(`Product with id ${id} not found`);
  }

  deleteProduct(id: number) {
    const productIndex = this.findProductIndex(id);
    if (productIndex >= 0) {
      this.products.splice(productIndex, 1);
      return 'Successfully deleted product ';
    } else throw new NotFoundException(`Product with id ${id} not found`);
  }
}
