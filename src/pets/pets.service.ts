import { PrismaService } from "prisma.service";

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Pet } from "@prisma/client";

import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const petExists = await this.prisma.pet.findFirst({
      where: {
        username: createPetDto.username,
      },
    });

    if (petExists) {
      console.log(
        `The username \'${createPetDto.username}\' is already associated with an account.`,
      );
      throw new HttpException(
        `The username \'${createPetDto.username}\' is already associated with an account.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const categoryExists = await this.prisma.category.findFirst({
      where: {
        id: createPetDto.categoryId,
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

    const breedExists = categoryExists.breeds.find((breed) => {
      return breed.id === createPetDto.breedId;
    });

    console.log("BREEDS", categoryExists.breeds);

    console.log("BREED EXISTS", breedExists);

    if (!breedExists) {
      console.log(`This breed of ${categoryExists.name} is not available.`);
      throw new HttpException(
        `This breed of ${categoryExists.name} is not available.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const guardianExists = await this.prisma.user.findFirst({
      where: {
        id: createPetDto.guardianId,
      },
    });

    if (!guardianExists) {
      console.log("Could not find pet guardian.");
      throw new HttpException(
        "Could not find pet guardian.",
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const pet = await this.prisma.pet.create({
        data: createPetDto,
      });

      return pet;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error while creating pet.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Pet[]> {
    const maxReturnPets = 1000;

    try {
      const pets = await this.prisma.pet.findMany({
        orderBy: { username: "asc" },
        take: maxReturnPets,
      });

      return pets;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching pets.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByCategory(categoryId: string): Promise<Pet[]> {
    const maxReturnPets = 1000;

    try {
      const pets = await this.prisma.pet.findMany({
        where: {
          categoryId,
        },
        orderBy: { username: "asc" },
        take: maxReturnPets,
      });

      return pets;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching pets.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByBreed(breedId: string): Promise<Pet[]> {
    const maxReturnPets = 1000;

    try {
      const pets = await this.prisma.pet.findMany({
        where: {
          breedId,
        },
        orderBy: { username: "asc" },
        take: maxReturnPets,
      });

      return pets;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching pets.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Pet> {
    try {
      const pet = await this.prisma.pet.findFirst({
        where: {
          id,
        },
      });

      return pet;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching pet.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByUsername(username: string): Promise<Pet> {
    try {
      const pet = await this.prisma.pet.findFirst({
        where: {
          username,
        },
      });

      return pet;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error fetching pet.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    try {
      const pet = await this.prisma.pet.update({
        where: {
          id,
        },
        data: updatePetDto,
      });

      return pet;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error updating pet.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Pet> {
    try {
      const pet = await this.prisma.pet.delete({
        where: {
          id,
        },
      });

      return pet;
    } catch (e) {
      console.log(e.message);
      throw new HttpException(
        "Error deleting pet.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
