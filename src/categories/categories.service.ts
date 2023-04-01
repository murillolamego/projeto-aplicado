import { PrismaService } from "prisma.service";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";

import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const categoryExists = await this.prisma.category.findFirst({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (categoryExists) {
      console.log(`The category "${createCategoryDto.name}" already exists.`);
      throw new HttpException(
        `The category "${createCategoryDto.name}" already exists.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const category = await this.prisma.category.create({
        data: createCategoryDto,
      });

      return category;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error while creating category.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Category[]> {
    const maxReturnCategorys = 1000;

    try {
      const categories = await this.prisma.category.findMany({
        orderBy: { name: "asc" },
        take: maxReturnCategorys,
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

  async findOne(id: string): Promise<Category> {
    try {
      const category = await this.prisma.category.findFirst({
        where: {
          id,
        },
      });

      return category;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching category.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const category = await this.prisma.category.update({
        where: {
          id,
        },
        data: updateCategoryDto,
      });

      return category;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error updating category.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Category> {
    try {
      const category = await this.prisma.category.delete({
        where: {
          id,
        },
      });

      return category;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error deleting category.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
