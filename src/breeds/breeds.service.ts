import { PrismaService } from "prisma.service";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Breed } from "@prisma/client";

import { CreateBreedDto } from "./dto/create-breed.dto";
import { UpdateBreedDto } from "./dto/update-breed.dto";

@Injectable()
export class BreedsService {
  constructor(private prisma: PrismaService) {}

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    const breedExists = await this.prisma.breed.findFirst({
      where: {
        name: createBreedDto.name,
      },
    });

    if (breedExists) {
      console.log(
        `The breed, \'${createBreedDto.name}\', already exists with the id: ${breedExists.id}`,
      );
      throw new HttpException(
        `The breed, \'${createBreedDto.name}\', already exists with the id: ${breedExists.id}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryExists = await this.prisma.category.findFirst({
      where: {
        id: createBreedDto.categoryId,
      },
      include: {
        breeds: true,
      },
    });

    if (!categoryExists) {
      console.log("This category of pet is not available.");
      throw new HttpException(
        "This category of pet is not available.",
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const breed = await this.prisma.breed.create({
        data: createBreedDto,
      });

      return breed;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error while creating breed.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Breed[]> {
    const maxReturnBreeds = 1000;

    try {
      const categories = await this.prisma.breed.findMany({
        orderBy: { name: "asc" },
        take: maxReturnBreeds,
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

  async findAllByCategory(categoryId: string): Promise<Breed[]> {
    const maxReturnBreeds = 1000;

    try {
      const categories = await this.prisma.breed.findMany({
        where: {
          categoryId,
        },
        orderBy: { name: "asc" },
        take: maxReturnBreeds,
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

  async findOne(id: string): Promise<Breed> {
    try {
      const breed = await this.prisma.breed.findFirst({
        where: {
          id,
        },
      });

      return breed;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching breed.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateBreedDto: UpdateBreedDto): Promise<Breed> {
    try {
      const breed = await this.prisma.breed.update({
        where: {
          id,
        },
        data: updateBreedDto,
      });

      return breed;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error updating breed.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Breed> {
    try {
      const breed = await this.prisma.breed.delete({
        where: {
          id,
        },
      });

      return breed;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error deleting breed.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
