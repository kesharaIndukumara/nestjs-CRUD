import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  allproducts() {
    return this.productService.getAllProducts();
  }

  @Get('by-id/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.getById(+id);
  }

  @Post('create-product')
  createProduct(@Body() newProductData: any) {
    console.log(newProductData);
    return this.productService.createProduct(newProductData);
  }

  @Put('update-product/:id')
  updateProduct(@Param('id') id: number, @Body() updateProductData: any) {
    return this.productService.updateProduct(+id, updateProductData);
  }

  @Delete('delete-product/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(+id);
  }
}
