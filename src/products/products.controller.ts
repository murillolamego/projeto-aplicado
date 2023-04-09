import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { Product } from "@prisma/client";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * Creates a product on the platform.
   */
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  /**
   * Fetches all products on the platform.
   */
  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  /**
   * Fetches a product with a given id on the platform.
   */
  @Get(":id")
  findOne(@Param("id") id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  /**
   * Updates a product with a given id on the platform.
   */
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  /**
   * Deletes a product with a given id on the platform.
   */
  @Delete(":id")
  remove(@Param("id") id: string): Promise<Product> {
    return this.productsService.remove(id);
  }
}
