import { PrismaService } from "prisma.service";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Product } from "@prisma/client";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create({ name, about }: CreateProductDto): Promise<Product> {
    const productExists = await this.prisma.product.findFirst({
      where: {
        name: name,
      },
    });

    if (productExists) {
      console.log(
        `The product, \'${name}\', already exists with the id: ${productExists.id}`,
      );
      throw new HttpException(
        `The product, \'${name}\', already exists with the id: ${productExists.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const product = await this.prisma.product.create({
        data: {
          name,
          about,
        },
      });

      return product;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error while creating product.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Product[]> {
    const maxReturnProducts = 1000;

    try {
      const categories = await this.prisma.product.findMany({
        orderBy: { name: "asc" },
        take: maxReturnProducts,
      });

      return categories;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching categories.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.prisma.product.findFirst({
        where: {
          id,
        },
      });

      return product;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching product.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.prisma.product.update({
        where: {
          id,
        },
        data: updateProductDto,
      });

      return product;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error updating product.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      const product = await this.prisma.product.delete({
        where: {
          id,
        },
      });

      return product;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error deleting product.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
